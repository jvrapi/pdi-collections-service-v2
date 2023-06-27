import { Collection } from '~/app/entities/collection';
import {
  CollectionsRepository,
  GetCollectionCards,
  SaveCard,
} from '../../repositories/collections-repository';
import { PrismaService } from '../services/prisma.service';
import { PrismaCollectionsMapper } from '../mappers/prisma-collections-mapper';
import { Injectable } from '@nestjs/common';
import { PrismaCardsMapper } from '../mappers/prisma-cards-mapper';
import { Card } from '~/app/entities/card';

@Injectable()
export class PrismaCollectionsRepository implements CollectionsRepository {
  constructor(private prismaClient: PrismaService) {}

  async create(userId: string): Promise<void> {
    await this.prismaClient.collection.create({
      data: {
        userId,
      },
    });
  }

  async saveCards(data: SaveCard): Promise<Card> {
    const { cardId, collectionId, quantity } = data;
    const card = await this.prismaClient.card.upsert({
      where: {
        id_collectionId: {
          collectionId,
          id: cardId,
        },
      },
      update: {
        quantity,
      },
      create: {
        id: cardId,
        quantity,
        collectionId,
      },
    });
    return PrismaCardsMapper.toDomain(card);
  }

  async getByUserId(userId: string): Promise<Collection | null> {
    const collection = await this.prismaClient.collection.findFirst({
      where: {
        userId,
      },
    });

    if (!collection) {
      return null;
    }

    return PrismaCollectionsMapper.toDomain(collection);
  }

  async getCards(filters: GetCollectionCards): Promise<Card[]> {
    const { collectionId, skip, take } = filters;

    const cards = await this.prismaClient.card.findMany({
      where: {
        collectionId,
      },
      skip,
      take,
    });

    return cards.map(PrismaCardsMapper.toDomain);
  }
}
