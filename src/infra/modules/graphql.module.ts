import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as GraphQLModuleNestJS } from '@nestjs/graphql';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    GraphQLModuleNestJS.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    DatabaseModule,
  ],
})
export class GraphQLModule {}
