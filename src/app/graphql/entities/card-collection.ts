import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseCard } from './card-base';

@ObjectType()
export class CardCollection extends BaseCard {
  @Field(() => Date)
  addedAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  quantity: number;
}
