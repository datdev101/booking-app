import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    UserModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService) => ({
        uri: appConfig.db.mongo.uri,
      }),
    }),
  ],
})
export class AppModule {}
