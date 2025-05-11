import { NestFactory } from '@nestjs/core';
import { applyAppConfig, initSwagger, setAppPrefix } from './app.helper';
import { AppModule } from './app.module';
import { AppConfigService } from './core/app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);

  applyAppConfig(app);
  setAppPrefix(app);
  initSwagger(app);

  await app.listen(appConfig.app.port);
}
bootstrap();
