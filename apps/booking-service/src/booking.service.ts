import { throwRpcError } from '@app/common/helper';
import { ICreateBookingReq } from '@app/common/interfaces/booking.interface';
import { RED_LOCK, RedisService } from '@app/redis';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Redis } from 'ioredis';
import { Model } from 'mongoose';
import Redlock from 'redlock';
import { lastValueFrom } from 'rxjs';
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
      const availableSeats = await lastValueFrom(
        this.concertService.send<number>(
          {
            cmd: 'get-available-seats',
          },
          dto,
        ),
      );

      if (!availableSeats) {
        throwRpcError(new BadRequestException('No available seats left'));
      }

      // Create booking
      const booking = await this.bookingModel.create({
        userId,
        concertId,
        seatTypeId,
        status: 'CONFIRMED',
      });

      await this.redisService.set(
        `concert:${dto.concertId}:seatType:${dto.seatTypeId}`,
        availableSeats - 1,
      );

      return booking;
    } finally {
      await lock.release();
    }
  }
}
