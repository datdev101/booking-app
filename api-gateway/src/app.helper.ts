import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppConfigService } from './core/app-config/app-config.service';
import { AllExceptionsFilter } from './core/handler/error/error.handler';
import { AuthGuard } from './module/auth/auth.guard';

export function setAppPrefix(app: INestApplication) {
  app.setGlobalPrefix(app.get(AppConfigService).app.prefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });
}

export function applyAppConfig(app: INestApplication) {
  app.use(cookieParser());
  app.useGlobalGuards(app.get(AuthGuard));
  app.use(
    helmet({
      hidePoweredBy: true,
      xXssProtection: true,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(
    new AllExceptionsFilter(
      app.get(AppConfigService),
      app.get(HttpAdapterHost).httpAdapter,
    ),
  );
}

export function initSwagger(app: INestApplication) {
  const appConfig = app.get(AppConfigService);
  const config = new DocumentBuilder()
    .setTitle(appConfig.swagger.title)
    .setDescription(appConfig.swagger.description)
    .setVersion(appConfig.swagger.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(appConfig.swagger.path, app, document);
}
