import { Collection } from '~/app/entities/collection';
import {
  CollectionsRepository,
  GetUserByIdProps,
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

  async getByUserId(props: GetUserByIdProps): Promise<Collection | null> {
    const { take, userId, skip } = props;
    const collection = await this.prismaClient.collection.findFirst({
      where: {
        userId,
      },
      include: {
        cards: {
          take,
          skip,
        },
      },
    });

    if (!collection) {
      return null;
    }

    return PrismaCollectionsMapper.toDomain(collection);
  }
}
