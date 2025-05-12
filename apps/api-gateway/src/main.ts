import { AppConfigService } from '@app/app-config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ApiGatewayModule } from './api-gateway.module';
import { EnvVar } from './config/env';
import { AllExceptionsFilter } from './error/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const appConfig = app.get(AppConfigService<EnvVar>);
  const httpAdapter = app.get(HttpAdapterHost).httpAdapter;

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(appConfig.get('APP_PORT'));
}

bootstrap();
