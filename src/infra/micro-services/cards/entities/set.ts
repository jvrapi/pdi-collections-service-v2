interface SetProps {
  code: string;
  iconUri: string;
  id: string;
  name: string;
  releasedAt: string;
}
export class Set {
  private props: SetProps;
  constructor(props: SetProps) {
    this.props = props;
  }

  public get code() {
    return this.props.code;
  }

  public get iconUri() {
    return this.props.iconUri;
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get releasedAt() {
    return this.props.releasedAt;
  }
}
