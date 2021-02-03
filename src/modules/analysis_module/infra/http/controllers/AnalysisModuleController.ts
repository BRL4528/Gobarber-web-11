import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ListAnalyzeModuleService from '@modules/analysis_module/services/ListAnalyzeModuleService';
import CreateAnalyzeModuleService from '@modules/analysis_module/services/CreateAnalyzeModuleService';
import UpdateAnalyzeModuleService from '@modules/analysis_module/services/UpdateAnalyzeModuleService';
// import ImportSubGoalService from '@modules/analysis_module/services/ImportSubGoalService';

export default class AnalysisModuleController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAnalyzeModule = container.resolve(ListAnalyzeModuleService);

    const analyzeModule = await listAnalyzeModule.execute();

    return res.json(analyzeModule);
  }

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

  public async update(req: Request, res: Response): Promise<Response> {
    const { analyze_module_id } = req.query;
    const { name, url, responsible } = req.body;

    const updateAnalyzeModule = container.resolve(UpdateAnalyzeModuleService);

    const analyzeModule = await updateAnalyzeModule.execute({
      analyze_module_id: String(analyze_module_id),
      name,
      url,
      responsible,
    });

    return res.json(analyzeModule);
  }
}
