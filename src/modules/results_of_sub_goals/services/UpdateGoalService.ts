import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsRepository from '../repositories/IResultsOfSubGoalsRepository';

import Goal from '../infra/typeorm/entities/ResultOfSubGoal';

interface IRequest {
  goal_id: string;
  name?: string;
  status?: string;
  weight?: string;
}

@injectable()
class UpdateGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,
  ) {}

  public async execute({
    goal_id,
    name,
    status,
    weight,
  }: IRequest): Promise<Goal> {
    const goal = await this.goalsRepository.findById(goal_id);

    if (!goal) {
      throw new AppError('Goal not exists.');
    }

    if (name) {
      goal.name = name;
    }

    if (status) {
      goal.status = status;
    }

    if (weight) {
      goal.weight = weight;
    }

    return this.goalsRepository.save(goal);
  }
}

export default UpdateGoalService;
