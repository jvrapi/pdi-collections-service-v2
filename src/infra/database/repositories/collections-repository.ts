import { Card } from '~/app/entities/card';
import { Collection } from '~/app/entities/collection';

export interface GetUserByIdProps {
  userId: string;
  take?: number;
  skip?: number;
}

export interface SaveCard {
  collectionId: string;
  cardId: string;
  quantity: number;
}

export abstract class CollectionsRepository {
  abstract getByUserId(props: GetUserByIdProps): Promise<Collection | null>;
  abstract saveCards(data: SaveCard): Promise<Card>;
}
