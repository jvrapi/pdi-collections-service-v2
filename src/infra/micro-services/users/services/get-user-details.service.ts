import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  UserDetailResponse,
  UsersRepository,
} from '../repositories/users-repository';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CONTEXT } from '@nestjs/graphql';
import { User } from '../entities/user';

@Injectable()
export class GetUserDetails {
  private logger = new Logger(GetUserDetails.name);
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @Inject(CONTEXT) private context: Context,
    private usersRepository: UsersRepository,
  ) {}

  async execute() {
    try {
      const { sub: userId } = this.context.req.user.payload;

      let userData = await this.cacheManager.get<UserDetailResponse>(userId);

      if (!userData) {
        userData = await this.usersRepository.getUserDetails();
        this.cacheManager.set(userId, userData);
      }

      return new User({
        ...userData,
        createdAt: new Date(userData.createdAt),
        updatedAt: new Date(userData.updatedAt),
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
