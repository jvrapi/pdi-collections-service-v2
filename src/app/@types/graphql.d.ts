import { Request } from 'express';

declare global {
  interface Context {
    req: Request;
  }
}

export {};
