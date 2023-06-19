import { Field, ArgsType, Int } from '@nestjs/graphql';
import { Max } from 'class-validator';

@ArgsType()
export class CardCollectionFilter {
  @Field(() => Int)
  @Max(30, { message: 'O máximo de cartas para serem listadas é de 30' })
  take: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}
