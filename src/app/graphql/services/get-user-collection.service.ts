import { Injectable, Logger } from '@nestjs/common';
import { CollectionsRepository } from '~/infra/database/repositories/collections-repository';

@Injectable()
export class GetUserCollectionService {
  private logger = new Logger(GetUserCollectionService.name);
  constructor(private collectionsRepository: CollectionsRepository) {}
  async execute(userId: string) {
    try {
      const collection = await this.collectionsRepository.getByUserId(userId);
      return collection;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Erro ao tentar buscar a coleção do usuário');
    }
  }
}
