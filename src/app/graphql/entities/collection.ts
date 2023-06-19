import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Collection {
  @Field()
  id: string;

  @Field()
  isShared: boolean;
}
