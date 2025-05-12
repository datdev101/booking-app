import { RabbitmqService } from '@app/rabbitmq';
import { NestFactory } from '@nestjs/core';
import { ConcertModule } from './concert.module';

async function bootstrap() {
  const app = await NestFactory.create(ConcertModule);
  const queueService = app.get(RabbitmqService);

  app.connectMicroservice(queueService.getOptions('concert'));
  await app.startAllMicroservices();
}

bootstrap();
