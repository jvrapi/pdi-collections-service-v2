import { Inject, Logger } from '@nestjs/common';
import {
  CardResponse,
  CardsRepository,
} from '../repositories/cards-repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CardMapper } from '../mappers/card-mapper';
import { Card } from '../entities/card';

export class GetCardsByIdsService {
  private logger = new Logger(GetCardsByIdsService.name);
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private cardsRepository: CardsRepository,
  ) {}
  async execute(ids: string[]) {
    try {
      const idsToGetDetails: string[] = [];
      const cards: Card[] = [];
      await Promise.all(
        ids.map(async (id) => {
          const card = await this.cacheManager.get<CardResponse>(`card_${id}`);

          if (!card) {
            idsToGetDetails.push(id);
          } else {
            cards.push(CardMapper.toDomain(card));
          }
        }),
      );
      if (idsToGetDetails.length) {
        const response = await this.cardsRepository.getCards({
          ids: idsToGetDetails,
        });
        await Promise.all(
          response.map(async (item) => {
            await this.cacheManager.set(`card_${item.id}`, item);
            cards.push(CardMapper.toDomain(item));
          }),
        );
      }
      return cards;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Erro ao tentar consultar o micro serviço de cartas');
    }
  }
}
