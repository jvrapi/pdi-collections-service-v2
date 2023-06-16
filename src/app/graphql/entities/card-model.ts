import { ObjectType } from '@nestjs/graphql';
import { BaseCardModel } from './card-base-model';

@ObjectType()
export class Card extends BaseCardModel {}
