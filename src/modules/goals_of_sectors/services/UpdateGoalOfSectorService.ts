import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsOfSectorsRepository from '../repositories/IGoalsOfSectorsRepository';

import GoalOfSector from '../infra/typeorm/entities/GoalOfSector';

interface IRequest {
  goal_of_sector_id: string;
  status_of_conclusion: boolean;
}

@injectable()
class UpdateGoalOfSectorService {
  constructor(
    @inject('GoalsOfSectorsRepository')
    private goalsOfSectorsRepository: IGoalsOfSectorsRepository,
  ) {}

  public async execute({
    goal_of_sector_id,
    status_of_conclusion,
  }: IRequest): Promise<GoalOfSector> {
    const goalOfSector = await this.goalsOfSectorsRepository.findById(
      goal_of_sector_id,
    );

    if (!goalOfSector) {
      throw new AppError('Goal of sector does not exist.');
    }

    // const goalOfSector = await this.goalsOfSectorsRepository.create({
    //   goal_id,
    //   sector_id,
    // });

    goalOfSector.status_of_conclusion = status_of_conclusion;

    return this.goalsOfSectorsRepository.save(goalOfSector);
  }
}

export default UpdateGoalOfSectorService;

// "results_of_sub_goals": [
//   {
//    "sub_goal_id": "a06714ce-b676-4c04-8dfe-4a57d386face",
//    "goal_id": "eb4d6fe4-d4a5-45da-ac27-4b071b8bd975",
//    "sector_id": "178e4408-de56-42c8-b39f-bd3a419bde4a",
//    "result": "sim"
//   },
//   {
//    "sub_goal_id": "4c0840e7-b355-4ff7-8f3c-68f8263bcb8c",
//    "goal_id": "eb4d6fe4-d4a5-45da-ac27-4b071b8bd975",
//    "sector_id": "178e4408-de56-42c8-b39f-bd3a419bde4a",
//    "result": "sim"
//   }
//  ]
