import { NodeEnv } from '@app/common';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class EnvVar {
  @IsEnum(NodeEnv)
  APP_ENV: NodeEnv;

  @IsString()
  @IsNotEmpty()
  RABBIT_MQ_URI: string;

  @IsString()
  @IsNotEmpty()
  RABBIT_MQ_BOOKING_QUEUE: string;

  @IsString()
  @IsNotEmpty()
  RABBIT_MQ_CONCERT_QUEUE: string;

  @IsString()
  @IsNotEmpty()
  MONGODB_URI: string;
}
