import { AppConfigService } from '@app/app-config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ApiGatewayModule } from './api-gateway.module';
import { EnvVar } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const appConfig = app.get(AppConfigService<EnvVar>);

  app.use(cookieParser());
  await app.listen(appConfig.get('APP_PORT', { infer: true }));
}
bootstrap();
