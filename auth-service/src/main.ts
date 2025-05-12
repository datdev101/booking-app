import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppConfigService } from './app-config/app-config.service';
import { AppModule } from './app.module';
import { CustomRpcExceptionFilter } from './common/exception-handling/error.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [appConfig.rabbitMQ.uri],
      queue: appConfig.rabbitMQ.queue.auth,
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
