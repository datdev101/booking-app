import { AppConfigModule, AppConfigService } from '@app/app-config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvVar } from '../config/env';
import { ConcertService } from './concert.constant';
import { ConcertController } from './concert.controller';

@Module({
  controllers: [ConcertController],
  imports: [
    ClientsModule.registerAsync([
      {
        name: ConcertService,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (appConfig: AppConfigService<EnvVar>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [appConfig.get<string>('RABBIT_MQ_URI')],
            queue: appConfig.get('RABBIT_MQ_CONCERT_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
})
export class ConcertModule {}
