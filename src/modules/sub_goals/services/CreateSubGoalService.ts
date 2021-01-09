import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsRepository from '@modules/goals/repositories/IGoalsRepository';
import ISubGoalsRepository from '../repositories/ISubGoalsRepository';

import SubGoal from '../infra/typeorm/entities/SubGoal';

interface IGoal {
  id: string;
}
interface IRequest {
  name: string;
  status: string;
  weight: string;
  goals: IGoal[];
}

@injectable()
class CreateSubGoalService {
  constructor(
    @inject('SubGoalsRepository')
    private subGoalsRepository: ISubGoalsRepository,

    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,
  ) {}

  public async execute({
    name,
    status,
    weight,
    goals,
  }: IRequest): Promise<SubGoal> {
    const checkSubGoalsExists = await this.subGoalsRepository.findByName(name);

    if (checkSubGoalsExists) {
      throw new AppError('Name already used.');
    }

    const existentGoals = await this.goalsRepository.findAllById(goals);
    console.log(existentGoals);

    if (!existentGoals) {
      throw new AppError('Could not find any goals with given ids');
    }

    const existentGoalsIds = existentGoals.map(goal => goal.id);

    const checkInexistentGoals = goals.filter(
      goal => !existentGoalsIds.includes(goal.id),
    );

    if (checkInexistentGoals.length) {
      throw new AppError(`Could not find goal ${checkInexistentGoals[0].id}`);
    }

    const subGoal = await this.subGoalsRepository.create({
      name,
      status,
      weight,
      goals,
    });

    return subGoal;
  }
}

export default CreateSubGoalService;
