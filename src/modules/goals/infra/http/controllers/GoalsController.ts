import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import CreateGoalService from '@modules/goals/services/CreateGoalService';
import ListGoalService from '@modules/goals/services/ListGoalService';
import UpdateGoalService from '@modules/goals/services/UpdateGoalService';
import ImportGoalService from '@modules/goals/services/ImportGoalService';

export default class GoalsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listGoal = container.resolve(ListGoalService);

    const goals = await listGoal.execute();

    return res.json(goals);
  }

  public async import(req: Request, res: Response): Promise<Response> {
    const importGoal = container.resolve(ImportGoalService);

    const goals = await importGoal.execute(req.file.path);

    return res.json(goals);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, status, weight, source, observations, type } = req.body;

    const createGoal = container.resolve(CreateGoalService);

    const goal = await createGoal.execute({
      name,
      status,
      weight,
      source,
      observations,
      type,
    });

    return res.json(goal);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { goal_id } = req.query;
    const { name, status, weight, source, observations, type } = req.body;

    const updateGoal = container.resolve(UpdateGoalService);

    const goal = await updateGoal.execute({
      goal_id: String(goal_id),
      name,
      status,
      weight,
      source,
      observations,
      type,
    });

    return res.json(goal);
  }
}
