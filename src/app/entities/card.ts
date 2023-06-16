interface CardProps {
  id: string;
  collectionId: string;
  quantity: number;
  addedAt: Date;
  updatedAt: Date;
}

export class Card {
  private props: CardProps;
  private _name: string;
  private _imageUri: string;
  private _faces: Card[] = [];

  constructor(props: CardProps) {
    this.props = props;
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this.name = name;
  }

  public get imageUri() {
    return this._imageUri;
  }

  public set imageUri(imageUri: string) {
    this.imageUri = imageUri;
  }

  public get quantity() {
    return this.props.quantity;
  }

  public get addedAt() {
    return this.props.addedAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public get collectionId() {
    return this.props.collectionId;
  }

  public get faces() {
    return this._faces;
  }

  public addFace(faceProps: CardProps) {
    this._faces.push(new Card(faceProps));
  }
}
