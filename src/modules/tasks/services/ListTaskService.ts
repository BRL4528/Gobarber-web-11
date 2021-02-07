import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ITasksRepository from '../repositories/ITasksRepository';

import Task from '../infra/typeorm/entities/Task';

@injectable()
class ListTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAll();

    return tasks;
  }
}

export default ListTaskService;
