import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsMongoId,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SeatType } from '../concert.enum';

export class SeatTypeDto {
  @ApiProperty()
  @IsMongoId()
  id: string;

  @ApiProperty({ enum: SeatType, enumName: 'SeatType' })
  @IsEnum(SeatType)
  type: SeatType;

  @ApiProperty()
  @IsInt()
  @Min(0)
  totalSeats: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  availableSeats: number;
}

export class ConcertDto {
  @ApiProperty()
  @IsMongoId()
  id: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;
}
