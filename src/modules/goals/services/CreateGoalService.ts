import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsRepository from '../repositories/IGoalsRepository';

import Goal from '../infra/typeorm/entities/Goal';

interface IRequest {
  name: string;
  status: string;
  weight: string;
}

@injectable()
class CreateGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,
  ) {}

  public async execute({ name, status, weight }: IRequest): Promise<Goal> {
    const checkGoalsExists = await this.goalsRepository.findByName(name);

    if (checkGoalsExists) {
      throw new AppError('Name already used.');
    }

    const goal = await this.goalsRepository.create({
      name,
      status,
      weight,
    });

    return goal;
  }
}

export default CreateGoalService;
