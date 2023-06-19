import { ArgsType, Field } from '@nestjs/graphql';
import { AddCardInput } from '../inputs/add.card';

@ArgsType()
export class AddCardsArgs {
  @Field(() => [AddCardInput])
  input: AddCardInput[];
}
