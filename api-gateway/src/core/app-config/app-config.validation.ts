import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { Environment } from './app-config.constant';

export class EnvironmentVariables {
  @IsEnum(Environment)
  APP_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  APP_PORT: number;

  @IsString()
  APP_PREFIX: string;

  @IsString()
  RABBIT_MQ_URI: string;

  @IsString()
  RABBIT_MQ_AUTH_QUEUE: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
