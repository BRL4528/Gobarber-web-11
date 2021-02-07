import Task from '../infra/typeorm/entities/Task';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';

export default interface ITasksRepository {
  findAllByName(tasks: ICreateTaskDTO[]): Promise<Task[]>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | undefined>;
  findByName(name: string): Promise<Task | undefined>;
  create(data: ICreateTaskDTO): Promise<Task>;
  createAll(tasks: ICreateTaskDTO[]): Promise<Task[]>;
  save(task: Task): Promise<Task>;
}
