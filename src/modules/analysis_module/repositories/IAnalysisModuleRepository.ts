import AnalysisModule from '../infra/typeorm/entities/AnalysisModule';
import ICreateAnalysisModuleDTO from '../dtos/ICreateAnalysisModuleDTO';

export default interface IAnalysisModuleRepository {
  findAllByName(
    analysisModule: ICreateAnalysisModuleDTO[],
  ): Promise<AnalysisModule[]>;
  findAll(): Promise<AnalysisModule[]>;
  findById(id: string): Promise<AnalysisModule | undefined>;
  findByName(name: string): Promise<AnalysisModule | undefined>;
  create(data: ICreateAnalysisModuleDTO): Promise<AnalysisModule>;
  createAll(
    analysisModule: ICreateAnalysisModuleDTO[],
  ): Promise<AnalysisModule[]>;
  save(analyzeModule: AnalysisModule): Promise<AnalysisModule>;
}
