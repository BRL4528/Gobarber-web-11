import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISectorsRepository from '@modules/sectors/repositories/ISectorsRepository';
import IGoalsRepository from '../repositories/IGoalsRepository';

import Goal from '../infra/typeorm/entities/Goal';

// interface ISubGoal {
//   id: string;
//   name: string;
//   status: string;
//   weight: string;
// }

interface IRequest {
  name: string;
  status: string;
  weight: string;
  sectors: string[];
}

@injectable()
class CreateGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,

    @inject('SectorsRepository')
    private sectorsRepository: ISectorsRepository,
  ) {}

  public async execute({
    name,
    status,
    weight,
    sectors,
  }: IRequest): Promise<Goal> {
    const checkGoalsExists = await this.goalsRepository.findByName(name);

    if (checkGoalsExists) {
      throw new AppError('Name already used.');
    }

    const sectorsIds = sectors.map(sector => {
      return {
        id: sector,
      };
    });

    const existentSectors = await this.sectorsRepository.findAllById(
      sectorsIds,
    );
    console.log(existentSectors);

    if (!existentSectors) {
      throw new AppError('Could not find any goals with given ids');
    }

    const existentSectorsIds = existentSectors.map(goal => goal.id);

    const checkInexistentSectors = sectorsIds.filter(
      sector => !existentSectorsIds.includes(sector.id),
    );

    if (checkInexistentSectors.length) {
      throw new AppError(
        `Could not find sector ${checkInexistentSectors[0].id}`,
      );
    }

    const goal = await this.goalsRepository.create({
      name,
      status,
      weight,
      sectors: existentSectorsIds,
    });

    return goal;
  }
}

export default CreateGoalService;
