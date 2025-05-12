import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppConfigModule } from 'src/core/app-config/app-config.module';
import { AppConfigService } from 'src/core/app-config/app-config.service';
import { EventService } from './event.constant';
import { EventController } from './event.controller';

@Module({
  providers: [
    {
      provide: EventService,
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [appConfig.rabbitMQ.uri],
            queue: appConfig.rabbitMQ.queue.event,
            queueOptions: {
              durable: true,
            },
          },
        }),
    },
  ],
  controllers: [EventController],
  imports: [AppConfigModule],
})
export class EventModule {}
