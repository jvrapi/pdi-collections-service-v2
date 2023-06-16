import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BaseCardModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  imageUri: string;
}
