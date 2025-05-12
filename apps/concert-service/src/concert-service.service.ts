import { Injectable } from '@nestjs/common';

@Injectable()
export class ConcertServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
