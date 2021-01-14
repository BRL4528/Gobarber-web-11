import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsRepository from '@modules/sub_goals/repositories/ISubGoalsRepository';
import IGoalsRepository from '../repositories/IGoalsRepository';

import Goal from '../infra/typeorm/entities/Goal';

@injectable()
class ListGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,

    @inject('SubGoalsRepository')
    private subGoalsRepository: ISubGoalsRepository,
  ) {}

  public async execute(): Promise<Goal[]> {
    const goals = await this.goalsRepository.findAll();

    if (!goals) {
      throw new AppError('Goals not exists.');
    }

    return goals;
  }
}

export default ListGoalService;
