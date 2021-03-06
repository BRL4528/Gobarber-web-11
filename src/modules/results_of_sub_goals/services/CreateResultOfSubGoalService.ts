import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IResultsOfSubGoalsRepository from '../repositories/IResultsOfSubGoalsRepository';

import ResultOfSubGoal from '../infra/typeorm/entities/ResultOfSubGoal';

interface IRequest {
  result: boolean;
  sub_goal_id: string;
  goal_id: string;
  sector_id: string;
}

@injectable()
class CreateResultOfSubGoalService {
  constructor(
    @inject('ResultsOfSubGoalsRepository')
    private resultsOfSubGoalsRepository: IResultsOfSubGoalsRepository,
  ) {}

  public async execute({
    result,
    sub_goal_id,
    goal_id,
    sector_id,
  }: IRequest): Promise<ResultOfSubGoal> {
    // const checkGoalsExists = await this.goalsRepository.findByName(result);

    // if (checkGoalsExists) {
    //   throw new AppError('Name already used.');
    // }

    const createdResult = await this.resultsOfSubGoalsRepository.create({
      result,
      sub_goal_id,
      goal_id,
      sector_id,
    });

    return createdResult;
  }
}

export default CreateResultOfSubGoalService;
