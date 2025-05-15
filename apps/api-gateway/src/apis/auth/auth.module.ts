import { AppConfigModule, AppConfigService } from '@app/app-config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvVar } from '../../config/env';
import { AuthService } from './auth.constant';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AuthService,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (appConfig: AppConfigService<EnvVar>) => ({
          transport: Transport.RMQ,
          options: {
            urls: [appConfig.get<string>('RABBIT_MQ_URI')],
            queue: appConfig.get('RABBIT_MQ_AUTH_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthGuard],
})
export class AuthModule {}
