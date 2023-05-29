import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract getUserDetails(): Promise<User | null>;
}
