import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import {
  CardResponse,
  CardsRepository,
  GetCardsFilters,
} from '../repositories/cards-repository';
import fetch from 'cross-fetch';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { extractJwt } from '~/app/utils/extract-jwt';
import { getCardsQuery } from '../graphql/queries/get-cards-query';
import { GetCardsResponse } from '../graphql/responses/get-cards-response';

export class ApolloCardsRepository implements CardsRepository {
  private client: ApolloClient<NormalizedCacheObject>;
  constructor(@Inject(CONTEXT) context: Context) {
    const { CARDS_SERVICE_URL } = process.env;

    const token = extractJwt(context.req.headers.authorization);
    const authorization = { authorization: `Bearer ${token}` };

    this.client = new ApolloClient({
      link: new HttpLink({
        uri: CARDS_SERVICE_URL,
        fetch,
        headers: {
          ...authorization,
        },
      }),
      cache: new InMemoryCache(),
    });
  }
  async getCards(filters: GetCardsFilters): Promise<CardResponse[]> {
    const { data } = await this.client.query<GetCardsResponse>({
      query: getCardsQuery,
      variables: { filters },
    });

    return data.cards;
  }
}
