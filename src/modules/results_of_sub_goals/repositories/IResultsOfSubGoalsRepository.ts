import ResultOfSubGoal from '../infra/typeorm/entities/ResultOfSubGoal';
import ICreateResultOfSubGoalDTO from '../dtos/ICreateResultOfSubGoalDTO';

interface ICreateAll {
  sub_goal_id: string;
  goal_id: string;
  sector_id: string;
  result: string;
}

export default interface IResultsOfSubGoalsRepository {
  // findAllByName(results: ICreateResultDTO[]): Promise<Result[]>;
  findAll(): Promise<ResultOfSubGoal[]>;
  findById(id: string): Promise<ResultOfSubGoal | undefined>;
  // findByName(name: string): Promise<Result | undefined>;
  create(data: ICreateResultOfSubGoalDTO): Promise<ResultOfSubGoal>;
  createAll(results_of_sub_goals: ICreateAll[]): Promise<ResultOfSubGoal[]>;
  save(resultOfSubGoal: ResultOfSubGoal): Promise<ResultOfSubGoal>;
}
