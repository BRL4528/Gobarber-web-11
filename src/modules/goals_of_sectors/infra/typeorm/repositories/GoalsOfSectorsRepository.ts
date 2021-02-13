import { getRepository, Repository } from 'typeorm';

import IGoalsOfSectorsRepository from '@modules/goals_of_sectors/repositories/IGoalsOfSectorsRepository';
import ICreateGoalOfSectorDTO from '@modules/goals_of_sectors/dtos/ICreateGoalOfSectorDTO';

import GoalOfSector from '@modules/goals_of_sectors/infra/typeorm/entities/GoalOfSector';

interface ICreateAll {
  sector_id: string;
  goals_ids: string[];
}

class GoalsOfSectorsRepository implements IGoalsOfSectorsRepository {
  private ormRepository: Repository<GoalOfSector>;

  constructor() {
    this.ormRepository = getRepository(GoalOfSector);
  }

  // public async findAllByIdSubGoals(goalsIds: string[]): Promise<SubGoal[]> {
  //   const subGoals = await this.ormRepository.find({
  //     where: {
  //       goal_ids: In(goalsIds),
  //     },
  //   });

  //   return subGoals;
  // }

  // public async findAll(): Promise<SubGoalOfGoal[] | undefined> {
  //   const subGoals = await this.ormRepository.find();

  //   return subGoals;
  // }

  public async findById(id: string): Promise<GoalOfSector | undefined> {
    const goalOfSector = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return goalOfSector;
  }

  public async findAllSectorById(
    sector_id: string,
  ): Promise<GoalOfSector[] | undefined> {
    const sectors = await this.ormRepository.find({
      where: {
        sector_id,
      },
    });

    return sectors;
  }

  public async findAllGoalById(
    goal_id: string,
  ): Promise<GoalOfSector[] | undefined> {
    const goals = await this.ormRepository.find({
      where: {
        goal_id,
      },
    });

    return goals;
  }

  public async findByName(name: string): Promise<GoalOfSector | undefined> {
    const goalOfSector = await this.ormRepository.findOne({
      where: { name },
    });

    return goalOfSector;
  }

  public async createAll({
    sector_id,
    goals_ids,
  }: ICreateAll): Promise<GoalOfSector[]> {
    const goalsOfSectorsAll = this.ormRepository.create(
      goals_ids.map(goalId => ({
        sector_id,
        goal_id: goalId,
      })),
    );

    await this.ormRepository.save(goalsOfSectorsAll);

    return goalsOfSectorsAll;
  }

  public async create({
    goal_id,
    sector_id,
  }: ICreateGoalOfSectorDTO): Promise<GoalOfSector> {
    const goalOfSector = this.ormRepository.create({
      sector_id,
      goal_id,
    });

    await this.ormRepository.save(goalOfSector);

    return goalOfSector;
  }

  public async save(goal_of_sector: GoalOfSector): Promise<GoalOfSector> {
    return this.ormRepository.save(goal_of_sector);
  }
}

export default GoalsOfSectorsRepository;
