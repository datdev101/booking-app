import { ackRmq } from '@app/common/helper';
import { ICreateBookingReq } from '@app/common/interfaces/booking.interface';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { BOOKING_MSG_PATTERN } from './booking.constant';
import { BookingService } from './booking.service';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern(BOOKING_MSG_PATTERN.CREATE_BOOKING)
  getAll(@Payload() payload: ICreateBookingReq, @Ctx() context: RmqContext) {
    ackRmq(context);
    return this.bookingService.createBooking(payload);
  }
}
