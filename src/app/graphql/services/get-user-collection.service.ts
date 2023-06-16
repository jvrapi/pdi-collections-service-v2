import { Injectable, Logger } from '@nestjs/common';
import { CollectionsRepository } from '~/infra/database/repositories/collections-repository';
import { GetCardsByIdsService } from '~/infra/micro-services/cards/services/get-cards-by-ids.service';

interface Args {
  userId: string;
  take: number;
  skip?: number;
}

@Injectable()
export class GetUserCollectionService {
  private logger = new Logger(GetUserCollectionService.name);
  constructor(
    private getCardsByIds: GetCardsByIdsService,
    private collectionsRepository: CollectionsRepository,
  ) {}
  async execute({ take, userId, skip }: Args) {
    try {
      const collection = await this.collectionsRepository.getByUserId({
        take,
        userId,
        skip,
      });
      return collection;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Erro ao tentar buscar a coleção do usuário');
    }
  }
}
