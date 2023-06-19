import { ObjectType } from '@nestjs/graphql';
import { BaseCard } from './card-base';

@ObjectType()
export class Card extends BaseCard {}
