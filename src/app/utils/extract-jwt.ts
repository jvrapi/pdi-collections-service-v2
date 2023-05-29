export const extractJwt = (authorization: string) =>
  authorization.split('Bearer')[1].trim();
