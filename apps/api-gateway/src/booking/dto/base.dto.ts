import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  ValidateIf,
} from 'class-validator';

enum SeatType {
  VIP = 'vip',
  REGULAR = 'regular',
  STANDING = 'standing',
}

enum Status {
  CONFIRMED = 'confirmed',
  CANCELLED = 'canceled',
}

export class BookingDto {
  @IsMongoId()
  id: string;

  @IsMongoId()
  userId: string;

  @IsMongoId()
  concertId: string;

  @IsMongoId()
  seatTypeId: string;

  @IsEnum(SeatType)
  seatType: SeatType;

  @IsNumber()
  price: number;

  @IsEnum(Status)
  status: Status;

  @IsDate()
  @ValidateIf((object, value) => value !== null)
  cancelAt: Date | null;
}
