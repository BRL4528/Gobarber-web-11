import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ITasksOfSubGoalsRepository from '../repositories/ITasksOfSubGoalsRepository';

import TaskOfSubGoal from '../infra/typeorm/entities/TaskOfSubGoal';

interface IRequest {
  sub_goal_id: string;
  tasks_ids: string[];
}

@injectable()
class CreateAllTaskOfSubGoalService {
  constructor(
    @inject('TasksOfSubGoalsRepository')
    private tasksOfSubGoalsRepository: ITasksOfSubGoalsRepository,
  ) {}

  public async execute({
    sub_goal_id,
    tasks_ids,
  }: IRequest): Promise<TaskOfSubGoal[]> {
    // const checkSectorExists = await this.subGoalsOfGoalsRepository.findByName(
    //   name,
    // );

    // if (checkSectorExists) {
    //   throw new AppError('Name already used.');
    // }

    const tasksOfSubGoals = await this.tasksOfSubGoalsRepository.createAll({
      sub_goal_id,
      tasks_ids,
    });

    return tasksOfSubGoals;
  }
}

export default CreateAllTaskOfSubGoalService;
