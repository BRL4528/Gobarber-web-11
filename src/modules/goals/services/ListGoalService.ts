import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsRepository from '../repositories/IGoalsRepository';

import Goal from '../infra/typeorm/entities/Goal';

interface IRequest {
  id: string;
}

@injectable()
class ListGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Goal> {
    const goal = await this.goalsRepository.findById(id);

    if (!goal) {
      throw new AppError('Goal not exists.');
    }

    return goal;
  }
}

export default ListGoalService;
