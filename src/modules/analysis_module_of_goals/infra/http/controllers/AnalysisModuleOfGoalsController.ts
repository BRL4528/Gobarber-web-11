import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ShowAnalyzeModuleOfGoalService from '@modules/analysis_module_of_goals/services/ShowAnalyzeModuleOfGoalService';
import CreateAnalyzeModuleOfGoalService from '@modules/analysis_module_of_goals/services/CreateAnalyzeModuleOfGoalService';
// import UpdateSubGoalService from '@modules/goals_of_sectors/services/UpdateSubGoalService';

export default class AnalysisModuleOfGoalsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { analyze_module_id } = req.query;

    const showAnalyzeModuleOfGoal = container.resolve(
      ShowAnalyzeModuleOfGoalService,
    );

    const analyzeModuleOfGoal = await showAnalyzeModuleOfGoal.execute({
      analyze_module_id: String(analyze_module_id),
    });

    return res.json(analyzeModuleOfGoal);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { goal_id, analyze_module_id } = req.body;
    const createAnalyzeModuleOfGoal = container.resolve(
      CreateAnalyzeModuleOfGoalService,
    );
    const analyzeModuleOfGoal = await createAnalyzeModuleOfGoal.execute({
      goal_id,
      analyze_module_id,
    });
    return res.json(analyzeModuleOfGoal);
  }
  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { sub_goal_id } = req.query;
  //   const { name, status, weight } = req.body;
  //   const updateSubGoal = container.resolve(UpdateSubGoalService);
  //   const subGoal = await updateSubGoal.execute({
  //     sub_goal_id: String(sub_goal_id),
  //     name,
  //     status,
  //     weight,
  //   });
  //   return res.json(subGoal);
  // }
}
