export interface GetCardsFilters {
  ids?: string[];
  take?: number;
  skip?: number;
}

export interface SetResponse {
  id: string;
  name: string;
  code: string;
  releasedAt: string;
  iconUri: string;
}

export interface FaceResponse {
  id: string;
  name: string;
  type: string;
  colors: string[];
  imageUri: string;
}

export interface CardResponse {
  id: string;
  name: string;
  rarity: string;
  type: string;
  colors: string[];
  formats: string[];
  versions: string[];
  imageUri?: string;
  set: SetResponse;
  faces: FaceResponse[];
}

export abstract class CardsRepository {
  abstract getCards(filters: GetCardsFilters): Promise<CardResponse[]>;
}
