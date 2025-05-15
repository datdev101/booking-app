import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ConcertDto {
  @IsMongoId()
  id: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;
}
