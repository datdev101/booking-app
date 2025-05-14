import { sendEventRmq, throwRpcError } from '@app/common/helper';
import { ICreateBookingReq } from '@app/common/interfaces/booking.interface';
import {
  IGetAvailableSeatsReq,
  IUpdateAvailableSeatsReq,
} from '@app/common/interfaces/concert.interface';
import { RED_LOCK, RedisService } from '@app/redis';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Redis } from 'ioredis';
import { Model } from 'mongoose';
import Redlock from 'redlock';
import { CONCERT_MSG_PATTERN } from './booking.constant';
import { Booking } from './schemas/booking.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @Inject(RedisService) private readonly redisService: Redis,
    @Inject(RED_LOCK) private readonly redLock: Redlock,
    @Inject('ConcertService') private readonly concertService: ClientProxy,
  ) {}

  async createBooking(dto: ICreateBookingReq) {
    // check user duplicate book concert
    // check user booking too much
    const { concertId, seatTypeId, userId } = dto;
    const lockKey = `lock:concert:${concertId}:seatType:${seatTypeId}`;
    const lock = await this.redLock.acquire([lockKey], 60000); // 1m lock

    try {
      // Check availability
      const availableSeats = await sendEventRmq<IGetAvailableSeatsReq, number>(
        this.concertService,
        CONCERT_MSG_PATTERN.GET_AVAILABLE_SEATS,
        dto,
      );

      if (!availableSeats) {
        throwRpcError(new BadRequestException('No available seats left'));
      }

      // TODO: check user has booked before ?
      // Check if user already has a confirmed booking for this concert
      const existingBooking = await this.bookingModel.findOne({
        userId,
        concertId,
        status: 'confirmed',
      });

      if (existingBooking) {
        throwRpcError(new BadRequestException('User already booked'));
      }

      // Find any booking by this user for this concert (regardless of status)
      // or create a new one if none exists
      const booking = await this.bookingModel.findOneAndUpdate(
        {
          userId,
          concertId,
          status: 'confirmed',
        },
        {
          $set: {
            userId,
            concertId,
            seatTypeId,
            status: 'confirmed',
            updatedAt: new Date(),
          },
        },
        {
          new: true, // Return the updated document
          upsert: true, // Create document if it doesn't exist
          setDefaultsOnInsert: true, // Apply schema defaults if creating new doc
        },
      );

      // decrease seat
      await sendEventRmq<IUpdateAvailableSeatsReq, unknown>(
        this.concertService,
        CONCERT_MSG_PATTERN.UPDATE_AVAILABLE_SEATS,
        dto,
      );

      // update available seats
      await this.redisService.set(
        `concert:${dto.concertId}:seatType:${dto.seatTypeId}`,
        availableSeats - 1,
      );

      return booking;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await lock.release();
    }
  }
}
