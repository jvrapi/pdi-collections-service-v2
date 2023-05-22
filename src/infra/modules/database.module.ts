import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';

@Module({
  providers: [
    PrismaService,
    // {
    //   provide: CardsRepository,
    //   useClass: PrismaCardsRepository,
    // },
    // {
    //   provide: SetsRepository,
    //   useClass: PrismaSetsRepository,
    // },
  ],
})
export class DatabaseModule {}
