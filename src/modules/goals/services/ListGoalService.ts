import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsRepository from '../repositories/IGoalsRepository';

import Goal from '../infra/typeorm/entities/Goal';

@injectable()
class ListGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,
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
