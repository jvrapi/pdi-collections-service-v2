import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as GraphQLModuleNestJS } from '@nestjs/graphql';
import { DatabaseModule } from './database.module';
import { join } from 'node:path';
import { UserResolver } from '~/app/graphql/resolvers/user.resolver';
import { AuthorizationModule } from './authorization.module';
import { UsersModule } from '../micro-services/users/users.module';
import { GetUserCollectionService } from '~/app/graphql/services/get-user-collection.service';
import { CacheModule } from './cache.module';
import { CardsModule } from '../micro-services/cards/cards.module';
import { CollectionResolver } from '~/app/graphql/resolvers/collection.resolver';
import { AddCardsToCollectionService } from '~/app/graphql/services/add-cards-to-collection.service';

@Module({
  imports: [
    GraphQLModuleNestJS.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
    AuthorizationModule,
    UsersModule,
    CacheModule,
    CardsModule,
  ],
  providers: [
    UserResolver,
    CollectionResolver,
    GetUserCollectionService,
    AddCardsToCollectionService,
  ],
})
export class GraphQLModule {}
