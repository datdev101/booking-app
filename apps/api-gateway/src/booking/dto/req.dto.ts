import { ICreateBookingReq } from '@app/common/interfaces/booking.interface';
import { PickType } from '@nestjs/swagger';
import { BookingDto } from './base.dto';

export class CreateBookingReq
  extends PickType(BookingDto, ['userId', 'concertId', 'seatTypeId'])
  implements ICreateBookingReq {}
