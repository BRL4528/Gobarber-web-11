import GoalOfSector from '../infra/typeorm/entities/GoalOfSector';
import ICreateGoalOfSectorDTO from '../dtos/ICreateGoalOfSectorDTO';

interface ICreateAll {
  sector_id: string;
  goals_ids: string[];
}

export default interface IGoalsOfSectorsRepository {
  // findAll(): Promise<GoalOfSector[] | undefined>;
  findById(id: string): Promise<GoalOfSector | undefined>;
  findAllSectorById(sector_id: string): Promise<GoalOfSector[] | undefined>;
  findAllGoalById(goal_id: string): Promise<GoalOfSector[] | undefined>;
  create(data: ICreateGoalOfSectorDTO): Promise<GoalOfSector>;
  createAll({ sector_id, goals_ids }: ICreateAll): Promise<GoalOfSector[]>;
  save(goal_of_sector: GoalOfSector): Promise<GoalOfSector>;
}
