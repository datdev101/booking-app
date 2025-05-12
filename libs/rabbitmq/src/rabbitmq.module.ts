import { AppConfigModule, AppConfigService } from '@app/app-config';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  providers: [RabbitmqService],
  exports: [RabbitmqService],
  imports: [AppConfigModule],
})
export class RabbitmqModule {
  static register(dto: { queue: string; service: string }): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: dto.service,
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: (
              configService: AppConfigService<Record<string, string>>,
            ) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(
                  `RABBIT_MQ_${dto.queue.toUpperCase()}_QUEUE`,
                ),
                queueOptions: {
                  durable: true,
                },
              },
            }),
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
