import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsRepository from '@modules/sub_goals/repositories/ISubGoalsRepository';
import IGoalsRepository from '../repositories/IGoalsRepository';

import Goal from '../infra/typeorm/entities/Goal';

// interface ISubGoal {
//   id: string;
//   name: string;
//   status: string;
//   weight: string;
// }

interface IRequest {
  name: string;
  status: string;
  weight: string;
  // sub_goals: ISubGoal[];
}

@injectable()
class CreateGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,

    @inject('SubGoalsRepository')
    private subGoalsRepository: ISubGoalsRepository,
  ) {}

  public async execute({
    name,
    status,
    weight,
  }: // sub_goals,
  IRequest): Promise<Goal> {
    const checkGoalsExists = await this.goalsRepository.findByName(name);

    if (checkGoalsExists) {
      throw new AppError('Name already used.');
    }

    // const serializedSubGoals = sub_goals.map(subGoal => ({
    //   id: subGoal.id,
    //   name: subGoal.name,
    //   status: subGoal.status,
    //   weight: subGoal.weight,
    // }));

    const goal = await this.goalsRepository.create({
      name,
      status,
      weight,
      // sub_goals: serializedSubGoals,
    });

    return goal;
  }
}

export default CreateGoalService;
