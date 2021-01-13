import SubGoal from '../infra/typeorm/entities/SubGoal';
import ICreateSubGoalDTO from '../dtos/ICreateSubGoalDTO';

export default interface ISubGoalsRepository {
  findAllByIdSubGoals(goalsIds: string[]): Promise<SubGoal[]>;
  findAll(): Promise<SubGoal[] | undefined>;
  findById(id: string): Promise<SubGoal | undefined>;
  findByName(name: string): Promise<SubGoal | undefined>;
  create(data: ICreateSubGoalDTO): Promise<SubGoal>;
  save(sub_goal: SubGoal): Promise<SubGoal>;
}
