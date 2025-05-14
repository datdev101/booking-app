import { AppConfigModule, AppConfigService } from '@app/app-config';
import { DynamicModule, Module } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';
import Redlock from 'redlock';

export const RedisService = 'RedisService';
export const RED_LOCK = 'RED_LOCK';

@Module({})
export class RedisModule {
  static register(redisOptions?: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [AppConfigModule],
      exports: [RedisService, RED_LOCK],
      providers: [
        {
          provide: RedisService,
          inject: [AppConfigService],
          useFactory: (appConfig: AppConfigService<Record<string, string>>) =>
            new Redis({
              host: appConfig.get<string>('REDIS_HOST'),
              port: appConfig.get<number>('REDIS_PORT'),
              ...redisOptions,
            }),
        },
        {
          provide: RED_LOCK,
          inject: [RedisService],
          useFactory: (redisService: Redis) => {
            return new Redlock([redisService], {
              retryCount: 3,
              retryDelay: 200,
            });
          },
        },
      ],
    };
  }
}
