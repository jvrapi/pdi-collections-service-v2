import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Set {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  releasedAt: string;

  @Field()
  iconUri: string;
}
