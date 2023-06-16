import axios, { AxiosInstance } from 'axios';
import { User } from '../entities/user';
import {
  UserDetailResponse,
  UsersRepository,
} from '../repositories/users-repository';
import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { extractJwt } from '~/app/utils/extract-jwt';

@Injectable()
export class AxiosUsersRepository implements UsersRepository {
  private client: AxiosInstance;
  constructor(@Inject(CONTEXT) private context: Context) {
    const token = extractJwt(this.context.req.headers.authorization);
    this.client = axios.create({
      baseURL: process.env.USERS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserDetails(): Promise<UserDetailResponse> {
    const response = await this.client.get<UserDetailResponse>('/me');

    if (response.status === 404) {
      return null;
    }

    return response.data;
  }
}
