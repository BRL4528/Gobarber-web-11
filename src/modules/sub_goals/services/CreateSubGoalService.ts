import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsRepository from '../repositories/ISubGoalsRepository';

import SubGoal from '../infra/typeorm/entities/SubGoal';

interface IRequest {
  name: string;
  status: string;
  weight: number;
}

@injectable()
class CreateSubGoalService {
  constructor(
    @inject('SubGoalsRepository')
    private subGoalsRepository: ISubGoalsRepository,
  ) {}

  public async execute({ name, status, weight }: IRequest): Promise<SubGoal> {
    const checkSubGoalsExists = await this.subGoalsRepository.findByName(name);

    if (checkSubGoalsExists) {
      throw new AppError('Name already used.');
    }

    const subGoal = await this.subGoalsRepository.create({
      name,
      status,
      weight,
    });

    return subGoal;
  }
}

export default CreateSubGoalService;
