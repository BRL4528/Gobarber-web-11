import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsOfSectorsRepository from '../repositories/IGoalsOfSectorsRepository';

import GoalOfSector from '../infra/typeorm/entities/GoalOfSector';

interface IRequest {
  sector_id: string;
  goals_ids: string[];
}

@injectable()
class CreateAllGoalOfSectorService {
  constructor(
    @inject('GoalsOfSectorsRepository')
    private goalsOfSectorsRepository: IGoalsOfSectorsRepository,
  ) {}

  public async execute({
    sector_id,
    goals_ids,
  }: IRequest): Promise<GoalOfSector[]> {
    // const checkSectorExists = await this.subGoalsOfGoalsRepository.findByName(
    //   name,
    // );

    // if (checkSectorExists) {
    //   throw new AppError('Name already used.');
    // }

    const goalsOfSectors = await this.goalsOfSectorsRepository.createAll({
      sector_id,
      goals_ids,
    });

    return goalsOfSectors;
  }
}

export default CreateAllGoalOfSectorService;
