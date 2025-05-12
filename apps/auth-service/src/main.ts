import { RabbitmqService } from '@app/rabbitmq';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const queueService = app.get(RabbitmqService);

  app.connectMicroservice(queueService.getOptions('auth'));
  await app.startAllMicroservices();
}
bootstrap();
