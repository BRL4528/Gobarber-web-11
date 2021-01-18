import Goal from '../infra/typeorm/entities/Goal';
import ICreateGoalDTO from '../dtos/ICreateGoalDTO';

export default interface IGoalsRepository {
  findAllByName(subGoals: ICreateGoalDTO[]): Promise<Goal[]>;
  findAll(): Promise<Goal[]>;
  findById(id: string): Promise<Goal | undefined>;
  findByName(name: string): Promise<Goal | undefined>;
  create(data: ICreateGoalDTO): Promise<Goal>;
  createAll(subGoals: ICreateGoalDTO[]): Promise<Goal[]>;
  save(goal: Goal): Promise<Goal>;
}
