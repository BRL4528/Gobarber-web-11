import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsRepository from '../repositories/ISubGoalsRepository';

import SubGoal from '../infra/typeorm/entities/SubGoal';

@injectable()
class ListSubGoalService {
  constructor(
    @inject('SubGoalsRepository')
    private subGoalsRepository: ISubGoalsRepository,
  ) {}

  public async execute(): Promise<SubGoal[]> {
    const subGoals = await this.subGoalsRepository.findAll();

    if (!subGoals) {
      throw new AppError('Sub goals not exists.');
    }

    return subGoals;
  }
}

export default ListSubGoalService;
