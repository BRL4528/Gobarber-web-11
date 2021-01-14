import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsOfGoalsRepository from '../repositories/ISubGoalsOfGoalsRepository';

import SubGoalOfGoal from '../infra/typeorm/entities/SubGoalOfGoal';

interface IRequest {
  goal_id: string;
}

@injectable()
class ShowSubOfGoalService {
  constructor(
    @inject('SubGoalsOfGoalsRepository')
    private subGoalsOfGoalsRepository: ISubGoalsOfGoalsRepository,
  ) {}

  public async execute({ goal_id }: IRequest): Promise<SubGoalOfGoal[]> {
    const subGoalsOfGoal = await this.subGoalsOfGoalsRepository.findAllGoalById(
      goal_id,
    );

    if (!subGoalsOfGoal) {
      throw new AppError('sub goals of goals not exists.');
    }

    return subGoalsOfGoal;
  }
}

export default ShowSubOfGoalService;
