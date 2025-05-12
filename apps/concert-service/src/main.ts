import { NestFactory } from '@nestjs/core';
import { ConcertServiceModule } from './concert-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ConcertServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
