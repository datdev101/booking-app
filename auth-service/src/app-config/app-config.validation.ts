import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsString, validateSync } from 'class-validator';
import { Environment } from './app-config.constant';

export class EnvironmentVariables {
  @IsEnum(Environment)
  APP_ENV: Environment;

  @IsString()
  RABBIT_MQ_URI: string;

  @IsString()
  RABBIT_MQ_AUTH_QUEUE: string;

  @IsString()
  MONGODB_URI: string;

  @IsInt()
  JWT_EXPIRE: number;

  @IsString()
  JWT_SECRET: string;
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
