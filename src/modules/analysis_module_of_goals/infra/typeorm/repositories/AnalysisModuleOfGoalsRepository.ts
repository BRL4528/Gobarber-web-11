import { getRepository, Repository } from 'typeorm';

import IAnalysisModuleOfGoalsRepository from '@modules/analysis_module_of_goals/repositories/IAnalysisModuleOfGoalsRepository';
import ICreateAnalyzeModuleOfGoalDTO from '@modules/analysis_module_of_goals/dtos/ICreateAnalyzeModuleOfGoalDTO';

import AnalyzeModuleOfGoal from '@modules/analysis_module_of_goals/infra/typeorm/entities/AnalyzeModuleOfGoal';

class AnalysisModuleOfGoalsRepository
  implements IAnalysisModuleOfGoalsRepository {
  private ormRepository: Repository<AnalyzeModuleOfGoal>;

  constructor() {
    this.ormRepository = getRepository(AnalyzeModuleOfGoal);
  }

  // public async findAllByIdSubGoals(goalsIds: string[]): Promise<SubGoal[]> {
  //   const subGoals = await this.ormRepository.find({
  //     where: {
  //       goal_ids: In(goalsIds),
  //     },
  //   });

  //   return subGoals;
  // }

  // public async findAll(): Promise<SubGoalOfGoal[] | undefined> {
  //   const subGoals = await this.ormRepository.find();

  //   return subGoals;
  // }

  public async findAllAnalyzeModuleById(
    analyze_module_id: string,
  ): Promise<AnalyzeModuleOfGoal[] | undefined> {
    const analysisModule = await this.ormRepository.find({
      where: {
        analyze_module_id,
      },
    });

    return analysisModule;
  }

  public async findAllGoalById(
    goal_id: string,
  ): Promise<AnalyzeModuleOfGoal[] | undefined> {
    const goals = await this.ormRepository.find({
      where: {
        goal_id,
      },
    });

    return goals;
  }

  public async findByName(
    name: string,
  ): Promise<AnalyzeModuleOfGoal | undefined> {
    const goalOfSector = await this.ormRepository.findOne({
      where: { name },
    });

    return goalOfSector;
  }

  public async create({
    goal_id,
    analyze_module_id,
  }: ICreateAnalyzeModuleOfGoalDTO): Promise<AnalyzeModuleOfGoal> {
    const analyzeModuleOfGoal = this.ormRepository.create({
      analyze_module_id,
      goal_id,
    });

    await this.ormRepository.save(analyzeModuleOfGoal);

    return analyzeModuleOfGoal;
  }

  public async save(
    analyze_module_of_goal: AnalyzeModuleOfGoal,
  ): Promise<AnalyzeModuleOfGoal> {
    return this.ormRepository.save(analyze_module_of_goal);
  }
}

export default AnalysisModuleOfGoalsRepository;
