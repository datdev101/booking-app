import { AppConfigModule, AppConfigService } from '@app/app-config';
import { RabbitmqModule } from '@app/rabbitmq';
import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { EnvVar } from './config/env';
import { Concert, ConcertSchema } from './schemas/concert.schema';

@Module({
  imports: [
    AppConfigModule.register({
      path: join(process.cwd(), 'apps/concert-service/.env'),
      cls: EnvVar,
    }),
    RabbitmqModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfig: AppConfigService<EnvVar>) => ({
        uri: appConfig.get('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }]),
    RedisModule.register(),
  ],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
