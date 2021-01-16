import SubGoal from '../infra/typeorm/entities/SubGoal';
import ICreateSubGoalDTO from '../dtos/ICreateSubGoalDTO';

export default interface ISubGoalsRepository {
  findAllByName(subGoals: ICreateSubGoalDTO[]): Promise<SubGoal[]>;
  findAll(): Promise<SubGoal[]>;
  findById(id: string): Promise<SubGoal | undefined>;
  findByName(name: string): Promise<SubGoal | undefined>;
  create(data: ICreateSubGoalDTO): Promise<SubGoal>;
  createAll(subGoals: ICreateSubGoalDTO[]): Promise<SubGoal[]>;
  save(subGoal: SubGoal): Promise<SubGoal>;
}
