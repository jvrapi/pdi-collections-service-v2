import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma/services/prisma.service';
import { CollectionsRepository } from '../database/repositories/collections-repository';
import { PrismaCollectionsRepository } from '../database/prisma/repositories/prisma-collections-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CollectionsRepository,
      useClass: PrismaCollectionsRepository,
    },
  ],
  exports: [CollectionsRepository],
})
export class DatabaseModule {}
