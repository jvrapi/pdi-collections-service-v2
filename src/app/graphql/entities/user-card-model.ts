import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseCardModel } from './card-base-model';

@ObjectType()
export class UserCardModel extends BaseCardModel {
  @Field(() => Date)
  addedAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  quantity: number;
}
