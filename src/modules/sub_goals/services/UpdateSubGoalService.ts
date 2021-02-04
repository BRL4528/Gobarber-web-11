import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsRepository from '../repositories/ISubGoalsRepository';

import SubGoal from '../infra/typeorm/entities/SubGoal';

interface IRequest {
  sub_goal_id: string;
  name?: string;
  status?: string;
  weight?: number;
  observations?: string;
}

@injectable()
class UpdateSubGoalService {
  constructor(
    @inject('SubGoalsRepository')
    private subGoalsRepository: ISubGoalsRepository,
  ) {}

  public async execute({
    sub_goal_id,
    name,
    status,
    weight,
    observations,
  }: IRequest): Promise<SubGoal> {
    const subGoal = await this.subGoalsRepository.findById(sub_goal_id);

    if (!subGoal) {
      throw new AppError('Sub goal not exists.');
    }

    if (name) {
      subGoal.name = name;
    }

    if (status) {
      subGoal.status = status;
    }

    if (weight) {
      subGoal.weight = weight;
    }

    if (observations) {
      subGoal.observations = observations;
    }

    return this.subGoalsRepository.save(subGoal);
  }
}

export default UpdateSubGoalService;
