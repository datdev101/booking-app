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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const channel = context.getChannelRef();
    const message = context.getMessage();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    channel.ack(message);
    return this.bookingService.createBooking(payload);
  }
}
