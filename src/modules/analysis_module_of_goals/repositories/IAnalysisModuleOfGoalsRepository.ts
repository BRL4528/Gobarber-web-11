import AnalyzeModuleOfGoal from '../infra/typeorm/entities/AnalyzeModuleOfGoal';
import ICreateAnalyzeModuleOfGoalDTO from '../dtos/ICreateAnalyzeModuleOfGoalDTO';

export default interface IAnalysisModuleOfGoalsRepository {
  findAllAnalyzeModuleById(
    analyze_module_id: string,
  ): Promise<AnalyzeModuleOfGoal[] | undefined>;
  findAllGoalById(goal_id: string): Promise<AnalyzeModuleOfGoal[] | undefined>;
  create(data: ICreateAnalyzeModuleOfGoalDTO): Promise<AnalyzeModuleOfGoal>;
  save(
    analyse_module_of_goal: AnalyzeModuleOfGoal,
  ): Promise<AnalyzeModuleOfGoal>;
}
