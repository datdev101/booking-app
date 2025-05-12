import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(applicationRef?: HttpServer) {
    super(applicationRef);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      super.catch(exception, host);
      return;
    }
    if (exception instanceof RpcException) {
      super.catch(exception.getError(), host);
      return;
    }

    const resException = new InternalServerErrorException();

    super.catch(resException, host);
    console.error(resException);
  }
}
