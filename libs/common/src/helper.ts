import { HttpException } from '@nestjs/common';
import { ClientProxy, RmqContext, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { IPattern } from './interfaces';

/**
 * @throws {RpcException}
 */
export function throwRpcError(httpException: HttpException): never {
  throw new RpcException(httpException);
}

export function ackRmq(context: RmqContext) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const channel = context.getChannelRef();
  const message = context.getMessage();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  channel.ack(message);
}

export function sendEventRmq<Request, Response>(
  client: ClientProxy,
  pattern: IPattern,
  data: Request,
): Promise<Response> {
  const observableRes = client.send<Response>(pattern, data).pipe(
    catchError((error) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      throwError(() => new RpcException(error.response)),
    ),
  );
  return lastValueFrom(observableRes);
}
