import { Face } from './face';
import { Set } from './set';

interface CardProps {
  colors: string[];
  formats: string[];
  id: string;
  imageUri?: string;
  name: string;
  rarity: string;
  type: string;
  versions: string[];
}

export class Card {
  private props: CardProps;
  private _set: Set;
  private _faces: Face[] = [];

  constructor(props: CardProps) {
    this.props = props;
  }

  public get colors() {
    return this.props.colors;
  }

  public get formats() {
    return this.props.formats;
  }

  public get id() {
    return this.props.id;
  }

  public get imageUri() {
    return this.props.imageUri;
  }

  public get name() {
    return this.props.name;
  }

  public get rarity() {
    return this.props.rarity;
  }

  public get type() {
    return this.props.type;
  }

  public get versions() {
    return this.props.versions;
  }

  public get set() {
    return this._set;
  }

  public set set(set: Set) {
    this._set = set;
  }

  public get faces() {
    return this._faces;
  }

  public set faces(faces: Face[]) {
    this._faces = faces;
  }
}
