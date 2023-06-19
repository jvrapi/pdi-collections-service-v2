import { Injectable, Logger } from '@nestjs/common';
import { CollectionsRepository } from '~/infra/database/repositories/collections-repository';

interface GetCardsCollectionFilters {
  take: number;
  skip?: number;
}

@Injectable()
export class GetCardsCollectionService {
  private logger = new Logger(GetCardsCollectionService.name);
  constructor(private collectionsRepository: CollectionsRepository) {}

  async execute(collectionId: string, filters: GetCardsCollectionFilters) {
    try {
      return this.collectionsRepository.getCards({
        ...filters,
        collectionId,
      });
    } catch (error) {
      this.logger.error('Error when try get cards collection', error);
      throw new Error('Error when try get cards collection');
    }
  }
}
