import { Collection } from '~/app/entities/collection';
import {
  CollectionsRepository,
  GetUserByIdProps,
} from '../../repositories/collections-repository';
import { PrismaService } from '../services/prisma.service';
import { PrismaCollectionsMapper } from '../mappers/prisma-collections-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCollectionsRepository implements CollectionsRepository {
  constructor(private prismaClient: PrismaService) {}

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
