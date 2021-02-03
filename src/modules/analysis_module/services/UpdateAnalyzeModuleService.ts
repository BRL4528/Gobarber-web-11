import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAnalysisModuleRepository from '../repositories/IAnalysisModuleRepository';

import AnalysisModule from '../infra/typeorm/entities/AnalysisModule';

interface IRequest {
  analyze_module_id: string;
  name?: string;
  url?: string;
  responsible?: string;
}

@injectable()
class UpdateAnalyzeModuleService {
  constructor(
    @inject('AnalysisModuleRepository')
    private analysisModuleRepository: IAnalysisModuleRepository,
  ) {}

  public async execute({
    analyze_module_id,
    name,
    url,
    responsible,
  }: IRequest): Promise<AnalysisModule> {
    const analyzeModule = await this.analysisModuleRepository.findById(
      analyze_module_id,
    );

    if (!analyzeModule) {
      throw new AppError('Analyze module not exists.');
    }

    if (name) {
      analyzeModule.name = name;
    }

    if (url) {
      analyzeModule.url = url;
    }

    if (responsible) {
      analyzeModule.responsible = responsible;
    }

    return this.analysisModuleRepository.save(analyzeModule);
  }
}

export default UpdateAnalyzeModuleService;
