import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IResultsOfSubGoalsRepository from '../repositories/IResultsOfSubGoalsRepository';
import ICreateResultOfSubGoalDTO from '../dtos/ICreateResultOfSubGoalDTO';

import ResultOfSubGoal from '../infra/typeorm/entities/ResultOfSubGoal';

@injectable()
class CreateAllResultOfSubGoalService {
  constructor(
    @inject('ResultsOfSubGoalsRepository')
    private resultsOfSubGoalsRepository: IResultsOfSubGoalsRepository,
  ) {}

  public async execute(
    results_of_sub_goals: ICreateResultOfSubGoalDTO[],
  ): Promise<ResultOfSubGoal[]> {
    // const checkSectorExists = await this.subGoalsOfGoalsRepository.findByName(
    //   name,
    // );

    // if (checkSectorExists) {
    //   throw new AppError('Name already used.');
    // }

    const resultsOfSubGoals = await this.resultsOfSubGoalsRepository.createAll(
      results_of_sub_goals,
    );

    return resultsOfSubGoals;
  }
}

export default CreateAllResultOfSubGoalService;
