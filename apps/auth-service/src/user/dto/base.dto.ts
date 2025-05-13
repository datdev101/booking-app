import { IsEmail, IsString, Max, Min } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Min(6)
  @Max(32)
  password: string;
}
