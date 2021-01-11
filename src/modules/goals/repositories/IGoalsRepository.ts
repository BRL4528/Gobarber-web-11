import Goal from '../infra/typeorm/entities/Goal';
import ICreateGoalDTO from '../dtos/ICreateGoalDTO';

// interface IFindSGoals {
//   id: string;
// }
export default interface IGoalsRepository {
  findAll(): Promise<Goal[]>;
  // findAllById(goals: IFindSGoals[]): Promise<Goal[]>;
  findById(id: string): Promise<Goal | undefined>;
  findByName(name: string): Promise<Goal | undefined>;
  create(data: ICreateGoalDTO): Promise<Goal>;
  save(goal: Goal): Promise<Goal>;
}
