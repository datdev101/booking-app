import { AppConfigModule, AppConfigService } from '@app/app-config';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EnvVar } from './config/env';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AppConfigModule.register({
      path: join(process.cwd(), 'apps/auth-service/.env'),
      cls: EnvVar,
    }),
    UserModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService<EnvVar>) => ({
        uri: appConfig.get('MONGODB_URI'),
      }),
    }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService<EnvVar>) => ({
        secret: appConfig.get('JWT_SECRET'),
        signOptions: {
          expiresIn: appConfig.get('JWT_EXPIRE'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
