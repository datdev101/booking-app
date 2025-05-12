import { HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

/**
 * @throws {RpcException}
 */
export function throwRpcError(httpException: HttpException): never {
  throw new RpcException(httpException);
}
