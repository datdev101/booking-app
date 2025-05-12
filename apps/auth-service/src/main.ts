import { AppConfigService } from '@app/app-config';
import { RabbitmqService } from '@app/rabbitmq';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { EnvVar } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  const queueService = app.get(RabbitmqService);
  const appConfig = app.get(AppConfigService<EnvVar>);

  app.connectMicroservice(queueService.getOptions('auth'));
  await app.startAllMicroservices();
  await app.listen(appConfig.get('APP_PORT'));
}
bootstrap();
