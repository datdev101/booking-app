import { Module } from '@nestjs/common';
import { AppConfigModule } from './core/app-config/app-config.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [AppConfigModule, AuthModule],
})
export class AppModule {}
