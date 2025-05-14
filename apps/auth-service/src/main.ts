import { AppConfigService } from '@app/app-config';
import { NestFactory } from '@nestjs/core';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { EnvVar } from './config/env';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    AuthModule,
    {
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService<EnvVar>) => ({
        transport: Transport.RMQ,
        options: {
          urls: [appConfig.get<string>('RABBIT_MQ_URI')],
          queue: appConfig.get('RABBIT_MQ_AUTH_QUEUE'),
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
