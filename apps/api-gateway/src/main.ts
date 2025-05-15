import { AppConfigService } from '@app/app-config';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ApiGatewayModule } from './api-gateway.module';
import { AuthGuard } from './apis/auth/auth.guard';
import { EnvVar } from './config/env';
import { AllExceptionsFilter } from './handler/error/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const appConfig = app.get(AppConfigService<EnvVar>);
  const httpAdapter = app.get(HttpAdapterHost).httpAdapter;

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalGuards(app.get(AuthGuard));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(appConfig.get('APP_PORT'));
}

bootstrap();
