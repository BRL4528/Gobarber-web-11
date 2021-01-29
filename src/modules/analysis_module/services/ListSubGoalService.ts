import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsRepository from '../repositories/IAnalysisModuleRepository';

import SubGoal from '../infra/typeorm/entities/AnalysisModule';

@injectable()
class ListSubGoalService {
  constructor(
    @inject('SubGoalsRepository')
    private subGoalsRepository: ISubGoalsRepository,
  ) {}

  public async execute(): Promise<SubGoal[]> {
    const subGoals = await this.subGoalsRepository.findAll();

    return subGoals;
  }
}

export default ListSubGoalService;
