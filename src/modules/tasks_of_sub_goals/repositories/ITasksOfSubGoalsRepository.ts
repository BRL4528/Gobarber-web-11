import TaskOfSubGoal from '../infra/typeorm/entities/TaskOfSubGoal';
import ICreateTaskOfSubGoalDTO from '../dtos/ICreateTaskOfSubGoalDTO';

interface ICreateAll {
  sub_goal_id: string;
  tasks_ids: string[];
}

export default interface ITasksOfSubGoalsRepository {
  // findAllByIdSubGoals(goalsIds: string[]): Promise<SubGoal[]>;
  // findAll(): Promise<TaskOfSubGoal[] | undefined>;
  findAllSubGoalById(sub_goal_id: string): Promise<TaskOfSubGoal[] | undefined>;
  findAllTaskById(task_id: string): Promise<TaskOfSubGoal[] | undefined>;
  create(data: ICreateTaskOfSubGoalDTO): Promise<TaskOfSubGoal>;
  createAll({ sub_goal_id, tasks_ids }: ICreateAll): Promise<TaskOfSubGoal[]>;
  save(task_of_sub_goal: TaskOfSubGoal): Promise<TaskOfSubGoal>;
}
