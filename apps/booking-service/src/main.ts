import { RabbitmqService } from '@app/rabbitmq';
import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';

async function bootstrap() {
  const app = await NestFactory.create(BookingModule);
  const queueService = app.get(RabbitmqService);

  app.connectMicroservice(queueService.getOptions('booking'));
  await app.startAllMicroservices();
}
bootstrap();
