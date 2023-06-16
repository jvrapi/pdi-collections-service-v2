import { Module } from '@nestjs/common';
import { GetCardsByIdsService } from './services/get-cards-by-ids.service';
import { CardsRepository } from './repositories/cards-repository';
import { ApolloCardsRepository } from './lib/apollo-cards-repository';

@Module({
  providers: [
    GetCardsByIdsService,
    {
      provide: CardsRepository,
      useClass: ApolloCardsRepository,
    },
  ],

  exports: [GetCardsByIdsService],
})
export class CardsModule {}
