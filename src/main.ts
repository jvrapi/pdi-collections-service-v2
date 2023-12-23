import 'dotenv/config';
import 'newrelic';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NewrelicInterceptor } from './app/interceptors/new-relic-interceptor';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new NewrelicInterceptor());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.RABBITMQ_USERS_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(PORT, () =>
    new Logger().log(`Server running on port ${PORT} 🚀`),
  );
}
bootstrap();
