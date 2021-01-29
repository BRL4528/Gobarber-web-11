import { getRepository, In, Repository } from 'typeorm';

import IAnalysisModuleRepository from '@modules/analysis_module/repositories/IAnalysisModuleRepository';
import ICreateAnalysisModuleDTO from '@modules/analysis_module/dtos/ICreateAnalysisModuleDTO';

import AnalysisModule from '@modules/analysis_module/infra/typeorm/entities/AnalysisModule';

class AnalysisModuleRepository implements IAnalysisModuleRepository {
  private ormRepository: Repository<AnalysisModule>;

  constructor() {
    this.ormRepository = getRepository(AnalysisModule);
  }

  public async findAllByName(
    analysesModule: ICreateAnalysisModuleDTO[],
  ): Promise<AnalysisModule[]> {
    const analysisModuleNames = analysesModule.map(
      analyzeModule => analyzeModule.name,
    );

    const existsAnalysisModule = await this.ormRepository.find({
      where: {
        name: In(analysisModuleNames),
      },
    });

    return existsAnalysisModule;
  }

  public async findAll(): Promise<AnalysisModule[]> {
    const analysesModule = await this.ormRepository.find();

    return analysesModule;
  }

  public async findById(id: string): Promise<AnalysisModule | undefined> {
    const analyzeModule = await this.ormRepository.findOne(id);

    return analyzeModule;
  }

  public async findByName(name: string): Promise<AnalysisModule | undefined> {
    const analyzeModule = await this.ormRepository.findOne({
      where: { name },
    });

    return analyzeModule;
  }

  public async createAll(
    analysesModule: ICreateAnalysisModuleDTO[],
  ): Promise<AnalysisModule[]> {
    const analysesModuleAll = this.ormRepository.create(
      analysesModule.map(analyzeModule => ({
        name: analyzeModule.name,
        url: analyzeModule.url,
        responsible: analyzeModule.responsible,
      })),
    );

    await this.ormRepository.save(analysesModuleAll);

    return analysesModuleAll;
  }

  public async create({
    name,
    url,
    responsible,
  }: ICreateAnalysisModuleDTO): Promise<AnalysisModule> {
    const analyzeModule = this.ormRepository.create({
      name,
      url,
      responsible,
    });

    await this.ormRepository.save(analyzeModule);

    return analyzeModule;
  }

  public async save(analyzeModule: AnalysisModule): Promise<AnalysisModule> {
    return this.ormRepository.save(analyzeModule);
  }
}

export default AnalysisModuleRepository;
