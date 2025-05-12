import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IPattern } from './interfaces/message-pattern.interface';

export async function sendEvent<Response>(
  client: ClientProxy,
  pattern: IPattern,
  data: unknown,
): Promise<Response> {
  const observableRes = client.send<Response>(pattern, data);
  return lastValueFrom(observableRes);
}
