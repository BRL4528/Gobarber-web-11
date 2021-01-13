import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsOfGoalsRepository from '../repositories/ISubGoalsOfGoalsRepository';

import SubGoalOfGoal from '../infra/typeorm/entities/SubGoalOfGoal';

interface IRequest {
  sub_goal_id: string;
  goal_id: string;
}

@injectable()
class CreateSubOfGoalService {
  constructor(
    @inject('SubGoalsOfGoalsRepository')
    private subGoalsOfGoalsRepository: ISubGoalsOfGoalsRepository,
  ) {}

  public async execute({
    sub_goal_id,
    goal_id,
  }: IRequest): Promise<SubGoalOfGoal> {
    // const checkSectorExists = await this.subGoalsOfGoalsRepository.findByName(
    //   name,
    // );

    // if (checkSectorExists) {
    //   throw new AppError('Name already used.');
    // }

    const subGoalOfGoal = await this.subGoalsOfGoalsRepository.create({
      sub_goal_id,
      goal_id,
    });

    return subGoalOfGoal;
  }
}

export default CreateSubOfGoalService;
