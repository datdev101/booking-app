import { Module } from '@nestjs/common';
import { AppConfigModule } from './core/app-config/app-config.module';
import { AuthModule } from './module/auth/auth.module';
import { EventModule } from './module/event/event.module';

@Module({
  imports: [AppConfigModule, AuthModule, EventModule],
})
export class AppModule {}
