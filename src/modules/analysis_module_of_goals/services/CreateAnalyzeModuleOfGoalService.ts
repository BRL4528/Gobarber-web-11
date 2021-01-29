import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAnalysisModuleOfGoalsRepository from '../repositories/IAnalysisModuleOfGoalsRepository';

import AnalyzeModuleOfGoal from '../infra/typeorm/entities/AnalyzeModuleOfGoal';

interface IRequest {
  goal_id: string;
  analyze_module_id: string;
}

@injectable()
class CreateAnalyzeModuleOfGoalService {
  constructor(
    @inject('AnalysisModuleOfGoalsRepository')
    private analysisModuleOfGoalsRepository: IAnalysisModuleOfGoalsRepository,
  ) {}

  public async execute({
    goal_id,
    analyze_module_id,
  }: IRequest): Promise<AnalyzeModuleOfGoal> {
    // const checkSectorExists = await this.analysisModuleOfGoalsRepository.findByName(
    //   name,
    // );

    // if (checkSectorExists) {
    //   throw new AppError('Name already used.');
    // }

    const analyzeModuleOfGoal = await this.analysisModuleOfGoalsRepository.create(
      {
        goal_id,
        analyze_module_id,
      },
    );

    return analyzeModuleOfGoal;
  }
}

export default CreateAnalyzeModuleOfGoalService;
