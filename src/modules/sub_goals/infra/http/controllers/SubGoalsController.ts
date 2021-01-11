import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ListSubGoalService from '@modules/sub_goals/services/ListSubGoalService';
import CreateSubGoalService from '@modules/sub_goals/services/CreateSubGoalService';

export default class SubGoalsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listSubGoal = container.resolve(ListSubGoalService);

    const subGoal = await listSubGoal.execute();

    return res.json(subGoal);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, status, weight, goals } = req.body;

    const createSubGoal = container.resolve(CreateSubGoalService);

    const subGoal = await createSubGoal.execute({
      name,
      status,
      weight,
      goals,
    });

    return res.json(subGoal);
  }
}
