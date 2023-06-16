import { Face } from '../entities/face';
import { FaceResponse } from '../repositories/cards-repository';

export class FaceMapper {
  static toDomain(face: FaceResponse) {
    return new Face(face);
  }
}
