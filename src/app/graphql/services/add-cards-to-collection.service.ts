import { Injectable, Logger } from '@nestjs/common';
import { CollectionsRepository } from '~/infra/database/repositories/collections-repository';

interface CardData {
  cardId: string;
  quantity: number;
}

interface AddCardData {
  userId: string;
  cards: CardData[];
}

@Injectable()
export class AddCardsToCollectionService {
  private logger = new Logger(AddCardsToCollectionService.name);
  constructor(private collectionsRepository: CollectionsRepository) {}

  async execute(data: AddCardData) {
    try {
      const { userId, cards } = data;

      const userCollection = await this.collectionsRepository.getByUserId({
        userId,
      });

      if (!userCollection) {
        throw new Error('Collection not found');
      }

      const cardsAdded = await Promise.all(
        cards.map((card) =>
          this.collectionsRepository.saveCards({
            quantity: card.quantity,
            cardId: card.cardId,
            collectionId: userCollection.id,
          }),
        ),
      );
      return cardsAdded;
    } catch (error) {
      this.logger.error(
        `Error when try add cards to user ${data.userId} collection`,
      );

      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Error when try add cards to user collection');
    }
  }
}
