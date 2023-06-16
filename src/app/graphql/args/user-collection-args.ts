import { Field, ArgsType } from '@nestjs/graphql';
import { Max } from 'class-validator';

@ArgsType()
export class UserCollectionArgs {
  @Field()
  @Max(30, { message: 'O máximo de cartas para serem listadas é de 30' })
  take: number;

  @Field({ nullable: true })
  skip?: number;
}
