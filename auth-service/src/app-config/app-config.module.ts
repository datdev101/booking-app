import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { validate } from './app-config.validation';

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      validate,
      expandVariables: true,
    }),
  ],
})
export class AppConfigModule {}
