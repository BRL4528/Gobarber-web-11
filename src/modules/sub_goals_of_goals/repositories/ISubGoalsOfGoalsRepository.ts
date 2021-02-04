import SubGoalOfGoal from '../infra/typeorm/entities/SubGoalOfGoal';
import ICreateSubGoalOfGoalDTO from '../dtos/ICreateSubGoalOfGoalDTO';

interface ICreateAll {
  goal_id: string;
  subGoalsIds: string[];
}

export default interface ISubGoalsOfGoalsRepository {
  // findAllByIdSubGoals(goalsIds: string[]): Promise<SubGoal[]>;
  // findAll(): Promise<SubGoalOfGoal[] | undefined>;
  findAllGoalById(goal_id: string): Promise<SubGoalOfGoal[] | undefined>;
  findAllSubGoalById(sub_goal_id: string): Promise<SubGoalOfGoal[] | undefined>;
  create(data: ICreateSubGoalOfGoalDTO): Promise<SubGoalOfGoal>;
  createAll({ goal_id, subGoalsIds }: ICreateAll): Promise<SubGoalOfGoal[]>;
  save(sub_goal_of_goal: SubGoalOfGoal): Promise<SubGoalOfGoal>;
}
