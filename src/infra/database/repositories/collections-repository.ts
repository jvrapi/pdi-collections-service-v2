import { Card } from '~/app/entities/card';
import { Collection } from '~/app/entities/collection';

export interface GetCollectionCards {
  collectionId: string;
  take?: number;
  skip?: number;
}

export interface SaveCard {
  collectionId: string;
  cardId: string;
  quantity: number;
}

export abstract class CollectionsRepository {
  abstract getByUserId(userId: string): Promise<Collection | null>;
  abstract getCards(filters: GetCollectionCards): Promise<Card[]>;
  abstract saveCards(data: SaveCard): Promise<Card>;
}
