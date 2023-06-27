import { InjectQueue } from '@nestjs/bull';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Queue } from 'bull';

interface CreateUserCollectionPayload {
  userId: string;
}

@Controller()
export class MessageController {
  private logger = new Logger(MessageController.name);
  constructor(
    @InjectQueue('create-new-user')
    private createNewUserQueue: Queue,
  ) {}

  @MessagePattern('user-created')
  async createUserCollection(@Payload() data: CreateUserCollectionPayload) {
    this.logger.log(
      `Novo usuário criado, iniciando a criação da coleção do usuário ${data.userId}`,
    );
    this.createNewUserQueue.add('create-new-user-job', data.userId);
  }
}
