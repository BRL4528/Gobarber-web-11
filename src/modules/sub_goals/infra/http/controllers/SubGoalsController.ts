import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ListSubGoalService from '@modules/sub_goals/services/ListSubGoalService';
import CreateSubGoalService from '@modules/sub_goals/services/CreateSubGoalService';
import UpdateSubGoalService from '@modules/sub_goals/services/UpdateSubGoalService';
import ImportSubGoalService from '@modules/sub_goals/services/ImportSubGoalService';

export default class SubGoalsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listSubGoal = container.resolve(ListSubGoalService);

    const subGoal = await listSubGoal.execute();

    return res.json(subGoal);
  }

  public async import(req: Request, res: Response): Promise<Response> {
    const importSubGoal = container.resolve(ImportSubGoalService);

    const subGoals = await importSubGoal.execute(req.file.path);

    return res.json(subGoals);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, status, weight, observations } = req.body;

    const createSubGoal = container.resolve(CreateSubGoalService);

    const subGoal = await createSubGoal.execute({
      name,
      status,
      weight,
      observations,
    });

    return res.json(subGoal);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { sub_goal_id } = req.query;
    const { name, status, weight, observations } = req.body;

    const updateSubGoal = container.resolve(UpdateSubGoalService);

    const subGoal = await updateSubGoal.execute({
      sub_goal_id: String(sub_goal_id),
      name,
      status,
      weight,
      observations,
    });

    return res.json(subGoal);
  }
}
