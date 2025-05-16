import { sendEventRmq } from '@app/common/helper';
import {
  ICreateBookingReq,
  ICreateBookingRes,
} from '@app/common/interfaces/booking.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthUser } from '../auth/auth.guard';
import { UserRequest } from '../auth/auth.interface';
import { BOOKING_MSG_PATTERN, BookingService } from './booking.constant';
import { CreateBookingReq } from './dto/req.dto';
import { CreateBookingRes } from './dto/res.dto';

@Controller('booking')
export class BookingController {
  constructor(
    @Inject(BookingService) private readonly bookingService: ClientProxy,
  ) {}

  @Post()
  async createBooking(
    @Body() payload: CreateBookingReq,
    @AuthUser() user: UserRequest,
  ) {
    const result = await sendEventRmq<ICreateBookingReq, ICreateBookingRes>(
      this.bookingService,
      BOOKING_MSG_PATTERN.CREATE_BOOKING,
      { ...payload, userId: user.id },
    );
    return new CreateBookingRes(result);
  }
}
