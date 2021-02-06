import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAnalysisModuleOfGoalsRepository from '../repositories/IAnalysisModuleOfGoalsRepository';

import AnalyzeModuleOfGoal from '../infra/typeorm/entities/AnalyzeModuleOfGoal';

interface IRequest {
  analyze_module_id: string;
}

@injectable()
class ShowAnalyzeModuleOfGoalService {
  constructor(
    @inject('AnalysisModuleOfGoalsRepository')
    private analysisModuleOfGoalsRepository: IAnalysisModuleOfGoalsRepository,
  ) {}

  public async execute({
    analyze_module_id,
  }: IRequest): Promise<AnalyzeModuleOfGoal[]> {
    const analyzeModuleOfGoal = await this.analysisModuleOfGoalsRepository.findAllAnalyzeModuleById(
      analyze_module_id,
    );

    if (!analyzeModuleOfGoal) {
      throw new AppError('Analysis module of goals not exists.');
    }

    return analyzeModuleOfGoal;
  }
}

export default ShowAnalyzeModuleOfGoalService;
