import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsOfSectorsRepository from '../repositories/IAnalysisModuleOfGoalsRepository';

import GoalOfSector from '../infra/typeorm/entities/AnalyzeModuleOfGoal';

interface IRequest {
  analyze_module_id: string;
}

@injectable()
class ShowGoalOfSectorService {
  constructor(
    @inject('GoalsOfSectorsRepository')
    private goalsOfSectorsRepository: IGoalsOfSectorsRepository,
  ) {}

  public async execute({
    analyze_module_id,
  }: IRequest): Promise<GoalOfSector[]> {
    const goalOfSector = await this.goalsOfSectorsRepository.findAllAnalyzeModuleById(
      analyze_module_id,
    );

    if (!goalOfSector) {
      throw new AppError('Goals of sectors not exists.');
    }

    return goalOfSector;
  }
}

export default ShowGoalOfSectorService;
