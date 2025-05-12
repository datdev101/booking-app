import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService<T> {
  constructor(readonly configService: ConfigService<T, true>) {}
}
