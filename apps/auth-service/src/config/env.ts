import { NodeEnv } from '@app/common';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class EnvVar {
  @IsEnum(NodeEnv)
  APP_ENV: NodeEnv;

  @IsNumber()
  @Min(0)
  @Max(65535)
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  RABBIT_MQ_URI: string;

  @IsString()
  @IsNotEmpty()
  RABBIT_MQ_AUTH_QUEUE: string;
}
