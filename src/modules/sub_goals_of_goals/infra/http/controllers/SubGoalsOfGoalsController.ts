import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ShowSubOfGoalService from '@modules/sub_goals_of_goals/services/ShowSubOfGoalService';
import CreateSubOfGoalService from '@modules/sub_goals_of_goals/services/CreateSubOfGoalService';
import CreateAllSubOfGoalService from '@modules/sub_goals_of_goals/services/CreateAllSubOfGoalService';
// import UpdateSubGoalService from '@modules/sub_goals_of_goals/services/UpdateSubGoalService';

export default class SubGoalsOfGoalsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { goal_id } = req.query;

    const showSubGoalOfGoal = container.resolve(ShowSubOfGoalService);

    const subGoalOfGoal = await showSubGoalOfGoal.execute({
      goal_id: String(goal_id),
    });

    return res.json(subGoalOfGoal);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { sub_goal_id, goal_id } = req.body;
    const createSubGoalOfGoal = container.resolve(CreateSubOfGoalService);
    const subGoalOfGoal = await createSubGoalOfGoal.execute({
      sub_goal_id,
      goal_id,
    });
    return res.json(subGoalOfGoal);
  }

  public async createAll(req: Request, res: Response): Promise<Response> {
    const { goal_id, sub_goals_ids } = req.body;
    const createSubGoalsOfGoals = container.resolve(CreateAllSubOfGoalService);
    const subGoalOfGoal = await createSubGoalsOfGoals.execute({
      goal_id,
      sub_goals_ids,
    });
    return res.json(subGoalOfGoal);
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
