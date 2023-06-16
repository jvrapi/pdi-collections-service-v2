import { Card } from './card';

interface CollectionProps {
  id: string;
  userId: string;
  isShared: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Collection {
  private props: CollectionProps;
  private _cards: Card[] = [];

  constructor(props: CollectionProps) {
    this.props = props;
  }

  public get cards() {
    return this._cards;
  }

  public set cards(cards: Card[]) {
    this._cards = cards;
  }

  public get id() {
    return this.props.id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get isShared() {
    return this.props.isShared;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
