import { Module } from '@nestjs/common';
import { GraphQLModule } from './graphql.module';
import { ConfigModule } from './config.module';
import { QueueModule } from './queue.module';
import { MessageController } from '../messaging/controllers/message.controller';

@Module({
  imports: [ConfigModule, GraphQLModule, QueueModule],
  controllers: [MessageController],
  providers: [],
})
export class AppModule {}
