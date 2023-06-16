import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User as UserModel } from '../entities/user-model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/app/guards/jwt-auth.guard';
import { GetUserDetails } from '~/infra/micro-services/users/services/get-user-details.service';
import { UserCollectionArgs } from '../args/user-collection-args';
import { UserCardModel } from '../entities/user-card-model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private getUserDetails: GetUserDetails) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserModel)
  async user() {
    const user = await this.getUserDetails.execute();
    return user;
  }

  @ResolveField(() => [UserCardModel])
  async cards(@Args() args: UserCollectionArgs) {
    console.log(args);
    return [];
  }
}
