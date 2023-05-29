import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as GraphQLModuleNestJS } from '@nestjs/graphql';
import { DatabaseModule } from './database.module';
import { join } from 'node:path';
import { UserResolver } from '~/app/graphql/resolvers/user.resolver';
import { AuthorizationModule } from './authorization.module';
import { UsersModule } from '../microservices/users/users.module';

@Module({
  imports: [
    GraphQLModuleNestJS.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
    AuthorizationModule,
    UsersModule,
  ],
  providers: [UserResolver],
})
export class GraphQLModule {}
