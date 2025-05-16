import {
  IGetAllConcertRes,
  IGetByIdConcertRes,
} from '@app/common/interfaces/concert.interface';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { SeatType } from '../concert.enum';
import { ConcertDto, SeatTypeDto } from './base.dto';

export class GetAllConcertDataResDto extends PickType(ConcertDto, [
  'id',
  'name',
  'date',
  'isActive',
]) {
  constructor(dto: IGetAllConcertRes['data'][0]) {
    super();
    this.id = dto._id;
    this.name = dto.name;
    this.date = dto.date;
    this.isActive = dto.isActive;
  }
}

export class GetAllConcertResDto {
  @ApiProperty({ isArray: true, type: GetAllConcertDataResDto })
  data: GetAllConcertDataResDto[];

  constructor(dto: IGetAllConcertRes) {
    this.data = dto.data.map((e) => new GetAllConcertDataResDto(e));
  }
}

export class GetSeatTypeResDataDto extends PickType(SeatTypeDto, [
  'id',
  'availableSeats',
  'totalSeats',
  'type',
]) {
  constructor(dto: IGetByIdConcertRes['seatTypes'][0]) {
    super();
    this.id = dto._id;
    this.availableSeats = dto.availableSeats;
    this.totalSeats = dto.totalSeats;
    this.type = dto.type as SeatType;
  }
}

export class GetByIdConcertResDataDto extends PickType(ConcertDto, [
  'id',
  'name',
  'isActive',
  'date',
]) {
  @ApiProperty({ type: GetSeatTypeResDataDto, isArray: true })
  seatTypes: GetSeatTypeResDataDto[];

  constructor(dto: IGetByIdConcertRes) {
    super();
    this.id = dto._id;
    this.name = dto.name;
    this.isActive = dto.isActive;
    this.date = dto.date;
    this.seatTypes = dto.seatTypes.map(
      (seatType) => new GetSeatTypeResDataDto(seatType),
    );
  }
}
