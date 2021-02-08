import { getRepository, Repository } from 'typeorm';

import ITasksOfSubGoalsRepository from '@modules/tasks_of_sub_goals/repositories/ITasksOfSubGoalsRepository';
import ICreateTaskOfSubGoalDTO from '@modules/tasks_of_sub_goals/dtos/ICreateTaskOfSubGoalDTO';

import TaskOfSubGoal from '@modules/tasks_of_sub_goals/infra/typeorm/entities/TaskOfSubGoal';

interface ICreateAll {
  sub_goal_id: string;
  tasks_ids: string[];
}

class TasksOfSubGoalsRepository implements ITasksOfSubGoalsRepository {
  private ormRepository: Repository<TaskOfSubGoal>;

  constructor() {
    this.ormRepository = getRepository(TaskOfSubGoal);
  }

  // public async findAllByIdSubGoals(goalsIds: string[]): Promise<SubGoal[]> {
  //   const subGoals = await this.ormRepository.find({
  //     where: {
  //       goal_ids: In(goalsIds),
  //     },
  //   });

  //   return subGoals;
  // }

  // public async findAll(): Promise<TaskOfSubGoal[] | undefined> {
  //   const subGoals = await this.ormRepository.find();

  //   return subGoals;
  // }

  public async findAllTaskById(
    task_id: string,
  ): Promise<TaskOfSubGoal[] | undefined> {
    const tasksOfSubGoal = await this.ormRepository.find({
      where: {
        task_id,
      },
    });

    return tasksOfSubGoal;
  }

  public async findAllSubGoalById(
    sub_goal_id: string,
  ): Promise<TaskOfSubGoal[] | undefined> {
    const subGoals = await this.ormRepository.find({
      where: {
        sub_goal_id,
      },
    });

    return subGoals;
  }

  public async createAll({
    sub_goal_id,
    tasks_ids,
  }: ICreateAll): Promise<TaskOfSubGoal[]> {
    const tasksOfSubGoalsAll = this.ormRepository.create(
      tasks_ids.map(taskId => ({
        sub_goal_id,
        task_id: taskId,
      })),
    );

    await this.ormRepository.save(tasksOfSubGoalsAll);

    return tasksOfSubGoalsAll;
  }

  public async create({
    task_id,
    sub_goal_id,
  }: ICreateTaskOfSubGoalDTO): Promise<TaskOfSubGoal> {
    const taskOfSubGoal = this.ormRepository.create({
      task_id,
      sub_goal_id,
    });

    await this.ormRepository.save(taskOfSubGoal);

    return taskOfSubGoal;
  }

  public async save(task_of_sub_goal: TaskOfSubGoal): Promise<TaskOfSubGoal> {
    return this.ormRepository.save(task_of_sub_goal);
  }
}

export default TasksOfSubGoalsRepository;
