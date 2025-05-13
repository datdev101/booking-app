import { RabbitmqService } from '@app/rabbitmq';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const queueService = app.get(RabbitmqService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      whitelist: true,
    }),
  );
  // app.useGlobalFilters(new AllExceptionsFilter());

  app.connectMicroservice(queueService.getOptions('auth'), {
    inheritAppConfig: true,
  });
  await app.startAllMicroservices();
}
bootstrap();
