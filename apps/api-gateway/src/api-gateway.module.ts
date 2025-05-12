import { AppConfigModule } from '@app/app-config';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { EnvVar } from './config/env';

@Module({
  imports: [
    AppConfigModule.register({
      path: join(process.cwd(), 'apps/api-gateway/.env'),
      cls: EnvVar,
    }),
  ],
})
export class ApiGatewayModule {}
