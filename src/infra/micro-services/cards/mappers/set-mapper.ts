import { Set } from '../entities/set';
import { SetResponse } from '../repositories/cards-repository';

export class SetMapper {
  static toDomain(set: SetResponse) {
    return new Set({
      code: set.code,
      iconUri: set.iconUri,
      id: set.id,
      name: set.name,
      releasedAt: set.releasedAt,
    });
  }
}
