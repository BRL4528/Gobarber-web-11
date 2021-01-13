import GoalOfSector from '../infra/typeorm/entities/GoalOfSector';
import ICreateGoalOfSectorDTO from '../dtos/ICreateGoalOfSectorDTO';

export default interface IGoalsOfSectorsRepository {
  // findAllByIdSubGoals(goalsIds: string[]): Promise<SubGoal[]>;
  // findAll(): Promise<GoalOfSector[] | undefined>;
  findAllSectorById(sector_id: string): Promise<GoalOfSector[] | undefined>;
  findAllGoalById(goal_id: string): Promise<GoalOfSector[] | undefined>;
  create(data: ICreateGoalOfSectorDTO): Promise<GoalOfSector>;
  save(goal_of_sector: GoalOfSector): Promise<GoalOfSector>;
}
