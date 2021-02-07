import { getRepository, In, Repository } from 'typeorm';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

import Task from '@modules/tasks/infra/typeorm/entities/Task';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async findAllByName(tasks: ICreateTaskDTO[]): Promise<Task[]> {
    const tasksNames = tasks.map(task => task.name);

    const existsTasks = await this.ormRepository.find({
      where: {
        name: In(tasksNames),
      },
    });

    return existsTasks;
  }

  public async findAll(): Promise<Task[]> {
    const tasks = await this.ormRepository.find();

    return tasks;
  }

  public async findById(id: string): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne(id);

    return task;
  }

  public async findByName(name: string): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne({
      where: { name },
    });

    return task;
  }

  public async createAll(tasks: ICreateTaskDTO[]): Promise<Task[]> {
    const tasksAll = this.ormRepository.create(
      tasks.map(task => ({
        name: task.name,
        weight: task.weight,
        observations: task.observations,
      })),
    );

    await this.ormRepository.save(tasksAll);

    return tasksAll;
  }

  public async create(taskData: ICreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create(taskData);

    await this.ormRepository.save(task);

    return task;
  }

  public async save(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }
}

export default TasksRepository;
