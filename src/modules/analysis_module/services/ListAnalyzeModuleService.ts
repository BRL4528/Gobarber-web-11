import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAnalysisModuleRepository from '../repositories/IAnalysisModuleRepository';

import AnalysisModule from '../infra/typeorm/entities/AnalysisModule';

@injectable()
class ListAnalyzeModuleService {
  constructor(
    @inject('AnalysisModuleRepository')
    private analysisModuleRepository: IAnalysisModuleRepository,
  ) {}

  public async execute(): Promise<AnalysisModule[]> {
    const analysisModule = await this.analysisModuleRepository.findAll();

    return analysisModule;
  }
}

export default ListAnalyzeModuleService;
