import { HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export function throwRpcError(httpException: HttpException) {
  throw new RpcException(httpException);
}
