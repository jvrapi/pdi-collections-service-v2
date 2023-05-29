import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../repositories/users-repository';

@Injectable()
export class GetUserDetails {
  private logger = new Logger(GetUserDetails.name);
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    try {
      return this.usersRepository.getUserDetails();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
