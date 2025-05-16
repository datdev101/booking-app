import { ICreateBookingRes } from '@app/common/interfaces/booking.interface';
import { PickType } from '@nestjs/swagger';
import { BookingDto, Status } from './base.dto';

export class CreateBookingRes extends PickType(BookingDto, [
  'id',
  'concertId',
  'status',
  'cancelAt',
  'seatTypeId',
]) {
  constructor(dto: ICreateBookingRes) {
    super();
    this.id = dto._id;
    this.concertId = dto.concertId;
    this.seatTypeId = dto.seatTypeId;
    this.status = dto.status as Status;
    this.cancelAt = dto.cancelAt;
  }
}
