declare namespace Express {
  interface User {
    payload: {
      sub: string;
      iat: number;
      exp: number;
    };
  }
  export interface Request {
    user: User;
  }
}
