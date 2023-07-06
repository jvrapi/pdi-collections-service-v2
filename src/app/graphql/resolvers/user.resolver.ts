import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { User as UserModel } from '../entities/user';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/app/guards/jwt-auth.guard';
import { GetUserDetails } from '~/infra/micro-services/users/services/get-user-details.service';
import { GetUserCollectionService } from '../services/get-user-collection.service';
import { User } from '~/infra/micro-services/users/entities/user';
import { Collection } from '../entities/collection';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private getUserDetails: GetUserDetails,
    private getUserCollection: GetUserCollectionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserModel)
  async user() {
    const user = await this.getUserDetails.execute();
    return user;
  }

  @ResolveField(() => Collection)
  async collection(@Root() user: User) {
    const { id: userId } = user;
    const collection = await this.getUserCollection.execute(userId);
    return collection;
  }
}
