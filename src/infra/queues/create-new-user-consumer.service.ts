import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CollectionsRepository } from '../database/repositories/collections-repository';
import { Logger } from '@nestjs/common';

@Processor('create-new-user')
export class CreateNewUserConsumer {
  private logger = new Logger(CreateNewUserConsumer.name);
  constructor(private collectionsRepository: CollectionsRepository) {}
  @Process('create-new-user-job')
  async createNewUserJob(job: Job<string>) {
    const { data: userId } = job;

    try {
      await this.collectionsRepository.create(userId);
      this.logger.log(`Coleção do usuário ${userId} criada com sucesso!`);
    } catch (error) {
      this.logger.error(
        `Erro ao tentar criar a coleção do usuário ${userId}`,
        error,
      );
    }
  }
}
