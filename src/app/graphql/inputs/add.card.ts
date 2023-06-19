import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddCardInput {
  @Field(() => Int)
  quantity: number;

  @Field()
  cardId: string;
}
