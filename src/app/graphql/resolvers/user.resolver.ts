import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { User as UserModel } from '../entities/user';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/app/guards/jwt-auth.guard';
import { GetUserDetails } from '~/infra/micro-services/users/services/get-user-details.service';
import { UserCollectionArgs } from '../args/user-collection-args';
import { CardCollection } from '../entities/card-collection';
import { GetUserCollectionService } from '../services/get-user-collection.service';
import { User } from '~/infra/micro-services/users/entities/user';
import { GetCardsByIdsService } from '~/infra/micro-services/cards/services/get-cards-by-ids.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private getUserDetails: GetUserDetails,
    private getUserCollection: GetUserCollectionService,
    private getCardsByIds: GetCardsByIdsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserModel)
  async user() {
    const user = await this.getUserDetails.execute();
    return user;
  }

  @ResolveField(() => [CardCollection])
  async cards(@Root() user: User, @Args() args: UserCollectionArgs) {
    const { take, skip } = args;
    const { id: userId } = user;
    const collection = await this.getUserCollection.execute({
      take,
      userId,
      skip,
    });
    const cardsIds = collection.cards.map((card) => card.id);
    return await this.getCardsByIds.execute(cardsIds);
  }
}
