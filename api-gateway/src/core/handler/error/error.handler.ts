import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Environment } from 'src/core/app-config/app-config.constant';
import { AppConfigService } from 'src/core/app-config/app-config.service';
import { ERROR_MAP } from './error.constant';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private readonly appConfig: AppConfigService,
    applicationRef?: HttpServer,
  ) {
    super(applicationRef);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      super.catch(exception, host);
      return;
    }

    const appConfig = this.appConfig;
    const resException = this.getResException({
      exception,
      env: appConfig.app.env,
    });

    // return error response to client
    super.catch(resException, host);
    console.error(resException);
  }

  private getResException(dto: { exception: unknown; env: Environment }) {
    // Only return execption on dev and local
    const devEnvironments = [Environment.DEV, Environment.LOCAL];
    const errorDetails = devEnvironments.includes(dto.env)
      ? { ...ERROR_MAP.UNKNOWN, error: JSON.stringify(dto.exception) }
      : ERROR_MAP.UNKNOWN;

    return new InternalServerErrorException(errorDetails);
  }
}
