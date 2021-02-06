import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsOfSectorsRepository from '../repositories/IGoalsOfSectorsRepository';

import GoalOfSector from '../infra/typeorm/entities/GoalOfSector';

interface IRequest {
  sector_id?: string;
  goal_id?: string;
}

@injectable()
class ShowGoalOfSectorService {
  constructor(
    @inject('GoalsOfSectorsRepository')
    private goalsOfSectorsRepository: IGoalsOfSectorsRepository,
  ) {}

  // eslint-disable-next-line consistent-return
  public async execute({
    sector_id,
    goal_id,
  }: IRequest): Promise<GoalOfSector[] | undefined> {
    if (sector_id) {
      const goalOfSector = await this.goalsOfSectorsRepository.findAllSectorById(
        sector_id,
      );

      if (!goalOfSector) {
        throw new AppError('Goals of sectors not exists.');
      }

      return goalOfSector;
    }

    if (goal_id) {
      const goalOfSector = await this.goalsOfSectorsRepository.findAllGoalById(
        goal_id,
      );

      if (!goalOfSector) {
        throw new AppError('Goals of sectors not exists.');
      }

      return goalOfSector;
    }
  }
}

export default ShowGoalOfSectorService;
