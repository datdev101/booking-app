import { ICreateBookingReq } from '@app/common/interfaces/booking.interface';
import { RabbitmqService } from '@app/rabbitmq';
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
  constructor(
    private readonly bookingService: BookingService,
    private readonly rmqService: RabbitmqService,
  ) {}

  @MessagePattern(BOOKING_MSG_PATTERN.CREATE_BOOKING)
  getAll(@Payload() payload: ICreateBookingReq, @Ctx() context: RmqContext) {
    console.log(payload);
    this.rmqService.ack(context);
    return { msg: 'Hello' };
  }
}
