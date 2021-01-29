import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

// import ListSubGoalService from '@modules/sub_goals/services/ListSubGoalService';
import CreateAnalyzeModuleService from '@modules/analysis_module/services/CreateAnalyzeModuleService';
// import UpdateSubGoalService from '@modules/sub_goals/services/UpdateSubGoalService';
// import ImportSubGoalService from '@modules/sub_goals/services/ImportSubGoalService';

export default class AnalysisModuleController {
  // public async index(req: Request, res: Response): Promise<Response> {
  //   const listSubGoal = container.resolve(ListSubGoalService);

  //   const analyzeModule = await listSubGoal.execute();

  //   return res.json(analyzeModule);
  // }

  // public async import(req: Request, res: Response): Promise<Response> {
  //   const importSubGoal = container.resolve(ImportSubGoalService);

  //   const subGoals = await importSubGoal.execute(req.file.path);

  //   return res.json(subGoals);
  // }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, url, responsible } = req.body;

    const createAnalyzeModule = container.resolve(CreateAnalyzeModuleService);

    const analyzeModule = await createAnalyzeModule.execute({
      name,
      url,
      responsible,
    });

    return res.json(analyzeModule);
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { sub_goal_id } = req.query;
  //   const { name, url, responsible } = req.body;

  //   const updateSubGoal = container.resolve(UpdateSubGoalService);

  //   const analyzeModule = await updateSubGoal.execute({
  //     sub_goal_id: String(sub_goal_id),
  //     name,
  //     url,
  //     responsible,
  //   });

  //   return res.json(analyzeModule);
  // }
}
