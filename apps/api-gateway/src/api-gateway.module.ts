import { AppConfigModule } from '@app/app-config';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { EnvVar } from './config/env';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule.register({
      path: join(process.cwd(), 'apps/api-gateway/.env'),
      cls: EnvVar,
    }),
    AuthModule,
  ],
})
export class ApiGatewayModule {}
