import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ITasksRepository from '../repositories/ITasksRepository';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';

import Task from '../infra/typeorm/entities/Task';

@injectable()
class CreateAllTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(tasks: ICreateTaskDTO[]): Promise<Task[]> {
    // const checkTasksExists = await this.tasksRepository.findByName(name);

    // if (checkTasksExists) {
    //   throw new AppError('Name already used.');
    // }

    const existentTasks = await this.tasksRepository.findAllByName(tasks);

    const existentTasksNames = existentTasks.map((task: Task) => task.name);

    const addTaskNames = tasks
      .filter(task => !existentTasksNames.includes(task.name))
      .filter(
        (value, index, self) =>
          self.findIndex(task => {
            return task.name === value.name;
          }) === index,
      );

    // if (addTaskNames.length < 0) {
    //   throw new AppError('Sub goals disabled');
    // }

    // await fs.promises.unlink(filePath);

    const createdTasks = await this.tasksRepository.createAll(addTaskNames);

    return createdTasks;
  }
}

export default CreateAllTaskService;
