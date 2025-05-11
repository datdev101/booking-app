import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './app-config.validation';

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  private getKey<K extends keyof EnvironmentVariables>(key: K) {
    return this.configService.get<EnvironmentVariables[K]>(key);
  }

  get app() {
    return {
      env: this.getKey('APP_ENV'),
    };
  }

  get rabbitMQ() {
    return {
      uri: this.getKey('RABBIT_MQ_URI'),
      queue: {
        auth: this.getKey('RABBIT_MQ_AUTH_QUEUE'),
      },
    };
  }
}
