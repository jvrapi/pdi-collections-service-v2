interface FaceProps {
  colors: string[];
  id: string;
  imageUri: string;
  name: string;
  type: string;
}
export class Face {
  private props: FaceProps;
  constructor(props: FaceProps) {
    this.props = props;
  }

  public get colors() {
    return this.props.colors;
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

  public get type() {
    return this.props.type;
  }
}
