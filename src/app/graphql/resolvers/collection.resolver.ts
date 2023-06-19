import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { CardCollection } from '../entities/card-collection';
import { AddCardsArgs } from '../args/add-cards-args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/app/guards/jwt-auth.guard';
import { UserId } from '../decorators/user-id.decorator';
import { GetCardsByIdsService } from '~/infra/micro-services/cards/services/get-cards-by-ids.service';
import { AddCardsToCollectionService } from '../services/add-cards-to-collection.service';
import { Collection as CollectionEntity } from '~/app/entities/collection';
import { Collection } from '../entities/collection';
import { CardCollectionFilter } from '../args/card-collection-args';
import { GetCardsCollectionService } from '../services/get-cards-collection.service';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(
    private getCardsByIdsService: GetCardsByIdsService,
    private addCardsToCollectionService: AddCardsToCollectionService,
    private getCardsCollectionService: GetCardsCollectionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => [CardCollection])
  async addCard(@Args() args: AddCardsArgs, @UserId() userId: string) {
    const cardsIds = args.input.map((card) => card.cardId);

    const validCards = await this.getCardsByIdsService.execute(cardsIds);

    const addCardsData = args.input.filter((card) =>
      validCards.some((validCard) => validCard.id === card.cardId),
    );

    const cardsAdded = await this.addCardsToCollectionService.execute({
      userId,
      cards: addCardsData,
    });

    return cardsAdded.map((card) => {
      const { imageUri, name } = validCards.find((item) => item.id === card.id);
      return {
        id: card.id,
        name,
        addedAt: card.addedAt,
        updatedAt: card.updatedAt,
        quantity: card.quantity,
        imageUri,
      };
    });
  }

  @ResolveField(() => [CardCollection])
  async cards(
    @Root() collection: CollectionEntity,
    @Args() args: CardCollectionFilter,
  ) {
    const { take, skip } = args;
    const { id: collectionId } = collection;
    const cardsCollection = await this.getCardsCollectionService.execute(
      collectionId,
      { take, skip },
    );
    const cardsIds = cardsCollection.map((card) => card.id);
    return await this.getCardsByIdsService.execute(cardsIds);
  }
}
