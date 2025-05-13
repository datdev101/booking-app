import { AppConfigService } from '@app/app-config';
import { NestFactory } from '@nestjs/core';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConcertModule } from './concert.module';
import { EnvVar } from './config/env';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    ConcertModule,
    {
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService<EnvVar>) => ({
        transport: Transport.RMQ,
        options: {
          urls: [appConfig.get<string>('RABBIT_MQ_URI')],
          queue: appConfig.get('RABBIT_MQ_CONCERT_QUEUE'),
          noAck: false,
          queueOptions: {
            durable: true,
          },
        },
      }),
    },
  );

  await app.listen();
}

bootstrap();
