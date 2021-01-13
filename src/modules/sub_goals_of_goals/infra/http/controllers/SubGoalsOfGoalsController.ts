import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

// import ListSubGoalService from '@modules/sub_goals/services/ListSubGoalService';
import CreateSubOfGoalService from '@modules/sub_goals_of_goals/services/CreateSubOfGoalService';
// import UpdateSubGoalService from '@modules/sub_goals/services/UpdateSubGoalService';

export default class SubGoalsOfGoalsController {
  // public async index(req: Request, res: Response): Promise<Response> {
  //   const listSubGoal = container.resolve(ListSubGoalService);
  //   const subGoal = await listSubGoal.execute();
  //   return res.json(subGoal);
  // }
  public async create(req: Request, res: Response): Promise<Response> {
    const { sub_goal_id, goal_id } = req.body;
    const createSubGoalOfGoal = container.resolve(CreateSubOfGoalService);
    const subGoalOfGoal = await createSubGoalOfGoal.execute({
      sub_goal_id,
      goal_id,
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
