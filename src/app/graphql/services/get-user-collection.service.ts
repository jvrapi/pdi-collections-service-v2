import { Injectable } from '@nestjs/common';
import { CollectionsRepository } from '~/infra/database/repositories/collections-repository';

interface Args {
  userId: string;
  take: number;
  skip?: number;
}

@Injectable()
export class GetUserCollectionService {
  constructor(private collectionsRepository: CollectionsRepository) {}
  async execute({ take, userId, skip }: Args) {
    try {
      const collection = await this.collectionsRepository.getByUserId({
        take,
        userId,
        skip,
      });
      return collection;
    } catch (error) {
      throw new Error('Erro ao tentar buscar a coleção do usuário');
    }
  }
}
