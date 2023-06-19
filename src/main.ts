import newrelic from 'newrelic'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NewrelicInterceptor } from './app/interceptors/new-relic-interceptor';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new NewrelicInterceptor());
  
  await app.listen(PORT, () =>
    new Logger().log(`Server running on port ${PORT} 🚀`),
  );
}
bootstrap();
