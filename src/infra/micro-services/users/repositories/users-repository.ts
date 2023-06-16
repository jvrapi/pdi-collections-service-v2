import { User } from '../entities/user';

export interface UserDetailResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export abstract class UsersRepository {
  abstract getUserDetails(): Promise<UserDetailResponse | null>;
}
