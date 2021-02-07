import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ITasksRepository from '../repositories/ITasksRepository';

import Task from '../infra/typeorm/entities/Task';

interface IRequest {
  name: string;
  weight: number;
  observations: string;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({
    name,
    weight,
    observations,
  }: IRequest): Promise<Task> {
    const checkTasksExists = await this.tasksRepository.findByName(name);

    if (checkTasksExists) {
      throw new AppError('Name already used.');
    }

    const task = await this.tasksRepository.create({
      name,
      weight,
      observations,
    });

    return task;
  }
}

export default CreateTaskService;
