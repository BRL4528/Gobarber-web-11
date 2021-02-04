import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAnalysisModuleRepository from '../repositories/IAnalysisModuleRepository';

import AnalysisModule from '../infra/typeorm/entities/AnalysisModule';

interface IRequest {
  name: string;
  url: string;
  responsible: string;
  observations: string;
  condition: string;
}

@injectable()
class CreateAnalyzeModuleService {
  constructor(
    @inject('AnalysisModuleRepository')
    private analysisModuleRepository: IAnalysisModuleRepository,
  ) {}

  public async execute({
    name,
    url,
    responsible,
    observations,
    condition,
  }: IRequest): Promise<AnalysisModule> {
    const checkAnalyzeModuleExists = await this.analysisModuleRepository.findByName(
      name,
    );

    if (checkAnalyzeModuleExists) {
      throw new AppError('Name already used.');
    }

    const analyzeModule = await this.analysisModuleRepository.create({
      name,
      url,
      responsible,
      observations,
      condition,
    });

    return analyzeModule;
  }
}

export default CreateAnalyzeModuleService;
