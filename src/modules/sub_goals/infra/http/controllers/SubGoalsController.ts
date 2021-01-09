import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import CreateSubGoalService from '@modules/sub_goals/services/CreateSubGoalService';

export default class SubGoalsController {
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
