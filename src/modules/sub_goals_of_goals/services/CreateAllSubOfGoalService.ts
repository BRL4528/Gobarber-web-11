import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsOfGoalsRepository from '../repositories/ISubGoalsOfGoalsRepository';

import SubGoalOfGoal from '../infra/typeorm/entities/SubGoalOfGoal';

interface IRequest {
  goal_id: string;
  sub_goals_ids: string[];
}

@injectable()
class CreateAllSubOfGoalService {
  constructor(
    @inject('SubGoalsOfGoalsRepository')
    private subGoalsOfGoalsRepository: ISubGoalsOfGoalsRepository,
  ) {}

  public async execute({
    goal_id,
    sub_goals_ids,
  }: IRequest): Promise<SubGoalOfGoal[]> {
    // const checkSectorExists = await this.subGoalsOfGoalsRepository.findByName(
    //   name,
    // );

    // if (checkSectorExists) {
    //   throw new AppError('Name already used.');
    // }

    const subGoalsOfGoals = await this.subGoalsOfGoalsRepository.createAll({
      goal_id,
      sub_goals_ids,
    });

    return subGoalsOfGoals;
  }
}

export default CreateAllSubOfGoalService;
