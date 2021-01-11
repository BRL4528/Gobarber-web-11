import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import CreateGoalService from '@modules/goals/services/CreateGoalService';
import ListGoalService from '@modules/goals/services/ListGoalService';

export default class GoalsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listGoal = container.resolve(ListGoalService);

    const goals = await listGoal.execute();

    return res.json(goals);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, status, weight } = req.body;

    const createGoal = container.resolve(CreateGoalService);

    const goal = await createGoal.execute({
      name,
      status,
      weight,
    });

    return res.json(goal);
  }
}
