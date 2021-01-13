import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsOfSectorsRepository from '../repositories/IGoalsOfSectorsRepository';

import GoalOfSector from '../infra/typeorm/entities/GoalOfSector';

interface IRequest {
  goal_id: string;
  sector_id: string;
}

@injectable()
class CreateGoalOfSectorService {
  constructor(
    @inject('GoalsOfSectorsRepository')
    private goalsOfSectorsRepository: IGoalsOfSectorsRepository,
  ) {}

  public async execute({
    goal_id,
    sector_id,
  }: IRequest): Promise<GoalOfSector> {
    // const checkSectorExists = await this.goalsOfSectorsRepository.findByName(
    //   name,
    // );

    // if (checkSectorExists) {
    //   throw new AppError('Name already used.');
    // }

    const goalOfSector = await this.goalsOfSectorsRepository.create({
      goal_id,
      sector_id,
    });

    return goalOfSector;
  }
}

export default CreateGoalOfSectorService;
