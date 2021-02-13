import ResultOfSubGoal from '../infra/typeorm/entities/ResultOfSubGoal';
import ICreateResultOfSubGoalDTO from '../dtos/ICreateResultOfSubGoalDTO';

export default interface IResultsOfSubGoalsRepository {
  // findAllByName(results: ICreateResultDTO[]): Promise<Result[]>;
  findAll(): Promise<ResultOfSubGoal[]>;
  findById(id: string): Promise<ResultOfSubGoal | undefined>;
  // findByName(name: string): Promise<Result | undefined>;
  create(data: ICreateResultOfSubGoalDTO): Promise<ResultOfSubGoal>;
  createAll(
    results_of_sub_goals: ICreateResultOfSubGoalDTO[],
  ): Promise<ResultOfSubGoal[]>;
  save(resultOfSubGoal: ResultOfSubGoal): Promise<ResultOfSubGoal>;
}
