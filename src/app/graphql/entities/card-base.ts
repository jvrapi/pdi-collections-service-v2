import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BaseCard {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  imageUri: string;
}
