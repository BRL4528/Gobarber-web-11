import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ITasksOfSubGoalsRepository from '../repositories/ITasksOfSubGoalsRepository';

import TaskOfSubGoal from '../infra/typeorm/entities/TaskOfSubGoal';

interface IRequest {
  task_id: string;
  sub_goal_id: string;
}

@injectable()
class CreateTaskOfSubGoalService {
  constructor(
    @inject('TasksOfSubGoalsRepository')
    private tasksOfSubGoalsRepository: ITasksOfSubGoalsRepository,
  ) {}

  public async execute({
    task_id,
    sub_goal_id,
  }: IRequest): Promise<TaskOfSubGoal> {
    // const checkSectorExists = await this.subGoalsOfGoalsRepository.findByName(
    //   name,
    // );

    // if (checkSectorExists) {
    //   throw new AppError('Name already used.');
    // }

    const taskOfSubGoal = await this.tasksOfSubGoalsRepository.create({
      task_id,
      sub_goal_id,
    });

    return taskOfSubGoal;
  }
}

export default CreateTaskOfSubGoalService;
