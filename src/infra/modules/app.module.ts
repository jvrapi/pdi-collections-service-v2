import { Module } from '@nestjs/common';
import { GraphQLModule } from './graphql.module';
import { ConfigModule } from './config.module';

@Module({
  imports: [ConfigModule, GraphQLModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
