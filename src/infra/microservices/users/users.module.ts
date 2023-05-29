import { Module } from '@nestjs/common';
import { GetUserDetails } from './services/get-user-details.service';
import { UsersRepository } from './repositories/users-repository';
import { AxiosUsersRepository } from './lib/axios-users-repository';

@Module({
  providers: [
    GetUserDetails,
    {
      provide: UsersRepository,
      useClass: AxiosUsersRepository,
    },
  ],

  exports: [GetUserDetails],
})
export class UsersModule {}
