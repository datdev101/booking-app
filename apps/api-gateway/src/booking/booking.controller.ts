import {
  ICreateBookingReq,
  ICreateBookingRes,
} from '@app/common/interfaces/booking.interface';
import { RabbitmqService } from '@app/rabbitmq';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BOOKING_MSG_PATTERN, BookingService } from './booking.constant';
import { CreateBookingReq } from './dto/req.dto';

@Controller('booking')
export class BookingController {
  constructor(
    @Inject(BookingService) private readonly bookingService: ClientProxy,
    private readonly rmqService: RabbitmqService,
  ) {}

  @Post()
  async createBooking(@Body() payload: CreateBookingReq) {
    const result = await this.rmqService.sendEvent<
      ICreateBookingReq,
      ICreateBookingRes
    >(this.bookingService, BOOKING_MSG_PATTERN.CREATE_BOOKING, payload);

    return result;
  }
}
