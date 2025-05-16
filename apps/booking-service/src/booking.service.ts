import { MESSAGE_PATTERN } from '@app/common';
import { sendEventRmq, throwRpcError } from '@app/common/helper';
import { ICreateBookingReq } from '@app/common/interfaces/booking.interface';
import {
  IGetAvailableSeatTypeReq,
  IGetAvailableSeatTypeRes,
  IUpdateAvailableSeatsReq,
} from '@app/common/interfaces/concert.interface';
import { RED_LOCK, RedisService } from '@app/redis';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Redis } from 'ioredis';
import { Model } from 'mongoose';
import Redlock from 'redlock';
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
    const { concertId, seatTypeId, userId } = dto;
    const lockKey = `lock:concert:${concertId}:seatType:${seatTypeId}`;
    const lock = await this.redLock.acquire([lockKey], 60000); // 1m lock

    try {
      const { availableSeat } = await sendEventRmq<
        IGetAvailableSeatTypeReq,
        IGetAvailableSeatTypeRes
      >(this.concertService, MESSAGE_PATTERN.CONCERT.GET_AVAILABLE_SEATS, dto);

      if (!availableSeat) {
        throwRpcError(new BadRequestException('No available seats left'));
      }

      const existingBooking = await this.bookingModel.findOne({
        userId,
        concertId,
        status: 'confirmed',
      });

      if (existingBooking) {
        throwRpcError(new BadRequestException('User already booked'));
      }

      // consider using transaction here
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
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      );

      await sendEventRmq<IUpdateAvailableSeatsReq, never>(
        this.concertService,
        MESSAGE_PATTERN.CONCERT.UPDATE_AVAILABLE_SEATS,
        {
          ...dto,
          amount: availableSeat - 1,
        },
      );

      return booking;
    } catch (err) {
      if (err instanceof RpcException) throw err;
      console.error(err);
      throwRpcError(
        new BadRequestException('Can not booking this seat on concert'),
      );
    } finally {
      await lock.release();
    }
  }
}
