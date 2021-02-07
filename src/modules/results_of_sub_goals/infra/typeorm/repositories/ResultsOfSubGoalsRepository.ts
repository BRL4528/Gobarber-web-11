import { getRepository, Repository } from 'typeorm';

import IResultsOfSubGoalsRepository from '@modules/results_of_sub_goals/repositories/IResultsOfSubGoalsRepository';
import ICreateResultOfSubGoalDTO from '@modules/results_of_sub_goals/dtos/ICreateResultOfSubGoalDTO';

import ResultOfSubGoal from '@modules/results_of_sub_goals/infra/typeorm/entities/ResultOfSubGoal';

interface ICreateAll {
  sub_goal_id: string;
  result: string;
}

class ResultsOfSubGoalsRepository implements IResultsOfSubGoalsRepository {
  private ormRepository: Repository<ResultOfSubGoal>;

  constructor() {
    this.ormRepository = getRepository(ResultOfSubGoal);
  }

  // public async findAllByName(results: ICreateResultDTO[]): Promise<Result[]> {
  //   const resultsNames = results.map(result => result.result);

  //   const existsGoals = await this.ormRepository.find({
  //     where: {
  //       name: In(resultsNames),
  //     },
  //   });

  //   return existsGoals;
  // }

  public async findAll(): Promise<ResultOfSubGoal[]> {
    const resultsOfSubGoals = await this.ormRepository.find();

    return resultsOfSubGoals;
  }

  public async findById(id: string): Promise<ResultOfSubGoal | undefined> {
    const resultOfSubGoal = await this.ormRepository.findOne(id);

    return resultOfSubGoal;
  }

  // public async findByName(name: string): Promise<Result | undefined> {
  //   const result = await this.ormRepository.findOne({
  //     where: { name },
  //   });

  //   return result;
  // }

  public async createAll(
    results_of_sub_goals: ICreateAll[],
  ): Promise<ResultOfSubGoal[]> {
    const resultsOfSubGoalsAll = this.ormRepository.create(
      results_of_sub_goals.map(resultOfGoal => ({
        sub_goal_id: resultOfGoal.sub_goal_id,
        result: resultOfGoal.result,
      })),
    );

    await this.ormRepository.save(resultsOfSubGoalsAll);

    return resultsOfSubGoalsAll;
  }

  public async create({
    result,
    sub_goal_id,
  }: ICreateResultOfSubGoalDTO): Promise<ResultOfSubGoal> {
    const createdResult = this.ormRepository.create({
      result,
      sub_goal_id,
    });

    await this.ormRepository.save(createdResult);

    return createdResult;
  }

  public async save(result: ResultOfSubGoal): Promise<ResultOfSubGoal> {
    return this.ormRepository.save(result);
  }
}

export default ResultsOfSubGoalsRepository;
