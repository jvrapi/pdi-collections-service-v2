import { Card } from '../entities/card';
import { CardResponse } from '../repositories/cards-repository';
import { FaceMapper } from './face-mapper';
import { SetMapper } from './set-mapper';

export class CardMapper {
  static toDomain(card: CardResponse) {
    const cardEntity = new Card(card);

    if (card.set) {
      cardEntity.set = SetMapper.toDomain(card.set);
    }

    if (card.faces.length) {
      cardEntity.faces = card.faces.map(FaceMapper.toDomain);
    }
    return cardEntity;
  }
}
