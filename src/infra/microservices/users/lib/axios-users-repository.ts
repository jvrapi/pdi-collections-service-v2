import axios, { AxiosInstance } from 'axios';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CONTEXT } from '@nestjs/graphql';
import { extractJwt } from '~/app/utils/extract-jwt';

interface MeResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Context {
  req: Request;
}

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

  async getUserDetails(): Promise<User> {
    const response = await this.client.get<MeResponse>('/me');

    if (response.status === 404) {
      return null;
    }

    return new User({
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
    });
  }
}
