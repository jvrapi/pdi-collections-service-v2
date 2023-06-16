import { Collection } from '~/app/entities/collection';

export interface GetUserByIdProps {
  userId: string;
  take: number;
  skip?: number;
}

export abstract class CollectionsRepository {
  abstract getByUserId(props: GetUserByIdProps): Promise<Collection | null>;
}
