import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsRepository from '@modules/sub_goals/repositories/ISubGoalsRepository';
import SubGoal from '@modules/sub_goals/infra/typeorm/entities/SubGoal';
import IGoalsRepository from '../repositories/IGoalsRepository';

import Goal from '../infra/typeorm/entities/Goal';

interface IResponse {
  goals: Goal[];
  subGoals: SubGoal[];
}

@injectable()
class ListGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,

    @inject('SubGoalsRepository')
    private subGoalsRepository: ISubGoalsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    const goals = await this.goalsRepository.findAll();

    if (!goals) {
      throw new AppError('Goals not exists.');
    }

    const goalsIds = goals.map(goal => goal.id);
    console.log(goalsIds);

    const subGoals = await this.subGoalsRepository.findAll();

    if (!subGoals) {
      throw new AppError('Sub goals not exists.');
    }

    const subGoalsIds = subGoals.map(subGoal => subGoal.goal_ids);

    // const checkInexistentSubGoals = subGoalsIds.filter(subGoal =>
    //   goalsIds.includes(subGoal),
    // );

    // const subGoalId = subGoalsIds.map(sub_goal_id => sub_goal_id.split(','));

    console.log(subGoalsIds);

    return { goals, subGoals };
  }
}

export default ListGoalService;
