import { AppConfigService } from '@app/app-config';
import { IPattern } from '@app/common/interface';
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  RmqContext,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitmqService {
  constructor(
    private readonly appConfig: AppConfigService<Record<string, string>>,
  ) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.appConfig.get<string>('RABBIT_MQ_URI')],
        queue: this.appConfig.get<string>(
          `RABBIT_MQ_${queue.toUpperCase()}_QUEUE`,
        ),
        noAck,
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  ack(context: RmqContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const channel = context.getChannelRef();
    const message = context.getMessage();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    channel.ack(message);
  }

  sendEvent<Response>(
    client: ClientProxy,
    pattern: IPattern,
    data: unknown,
  ): Promise<Response> {
    const observableRes = client.send<Response>(pattern, data);
    return lastValueFrom(observableRes);
  }
}
