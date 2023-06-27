import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from './database.module';
import { CreateNewUserConsumer } from '../queues/create-new-user-consumer.service';

@Module({
  imports: [
    DatabaseModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: +process.env.REDIS_PORT,
      },
      prefix: 'collections_service',
    }),
    BullModule.registerQueue({
      name: 'create-new-user',
    }),
  ],
  providers: [CreateNewUserConsumer],
  exports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: +process.env.REDIS_PORT,
      },
      prefix: 'cards_service',
    }),
    BullModule.registerQueue({
      name: 'create-new-user',
    }),
  ],
})
export class QueueModule {}
