import Goal from '../infra/typeorm/entities/Goal';
import ICreateGoalDTO from '../dtos/ICreateGoalDTO';

export default interface IGoalsRepository {
  findById(id: string): Promise<Goal | undefined>;
  findByName(name: string): Promise<Goal | undefined>;
  create(data: ICreateGoalDTO): Promise<Goal>;
  save(goal: Goal): Promise<Goal>;
}
