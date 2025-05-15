import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export const GROUP_REGISTER = 'group_register_user_response';

export class UserDto {
  @ApiProperty()
  @IsMongoId()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
