import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AppConfigService } from './app-config.service';

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {
  static register(option: {
    path: string;
    cls: ClassConstructor<Record<string, any>>;
  }): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: option.path,
          validate: (config) => {
            const validatedConfig = plainToInstance(option.cls, config, {
              enableImplicitConversion: true,
            });
            const errors = validateSync(validatedConfig, {
              skipMissingProperties: false,
            });
            if (errors.length > 0) {
              throw new Error(errors.toString());
            }
            return validatedConfig;
          },
        }),
      ],
    };
  }
}
