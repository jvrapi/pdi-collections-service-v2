import { Query, Resolver } from '@nestjs/graphql';
import { User as UserModel } from '../entities/user-model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/app/guards/jwt-auth.guard';
import { GetUserDetails } from '~/infra/microservices/users/services/get-user-details.service';

@Resolver()
export class UserResolver {
  constructor(private getUserDetails: GetUserDetails) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserModel)
  async user() {
    const user = await this.getUserDetails.execute();
    return user;
  }
}
