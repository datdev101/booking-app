import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppConfigModule } from 'src/core/app-config/app-config.module';
import { AppConfigService } from 'src/core/app-config/app-config.service';
import { AuthService } from './auth.constant';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  imports: [AppConfigModule],
  exports: [AuthService],
  providers: [
    AuthGuard,
    {
      provide: AuthService,
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [appConfig.rabbitMQ.uri],
            queue: appConfig.rabbitMQ.queue.auth,
            queueOptions: {
              durable: true,
            },
          },
        }),
    },
  ],
})
export class AuthModule {}
