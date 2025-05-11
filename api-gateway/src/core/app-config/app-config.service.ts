import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
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
      port: this.getKey('APP_PORT'),
      env: this.getKey('APP_ENV'),
      prefix: this.getKey('APP_PREFIX'),
    };
  }

  get swagger() {
    return {
      path: join(this.app.prefix, 'docs'),
      title: 'Dev Server',
      description: 'Dev Server API description',
      version: '1.0',
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
