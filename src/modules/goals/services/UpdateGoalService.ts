import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsRepository from '../repositories/IGoalsRepository';

import Goal from '../infra/typeorm/entities/Goal';

interface IRequest {
  goal_id: string;
  name?: string;
  status?: string;
  weight?: string;
  source?: string;
  observations?: string;
  type?: string;
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
    source,
    observations,
    type,
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

    if (source) {
      goal.source = source;
    }

    if (observations) {
      goal.observations = observations;
    }

    if (type) {
      goal.type = type;
    }

    return this.goalsRepository.save(goal);
  }
}

export default UpdateGoalService;
