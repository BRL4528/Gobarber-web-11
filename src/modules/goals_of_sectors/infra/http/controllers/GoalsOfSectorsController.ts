import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ShowGoalOfSectorService from '@modules/goals_of_sectors/services/ShowGoalOfSectorService';
import CreateGoalOfSectorService from '@modules/goals_of_sectors/services/CreateGoalOfSectorService';
// import UpdateSubGoalService from '@modules/goals_of_sectors/services/UpdateSubGoalService';

export default class GoalsOfSectorsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { sector_id, goal_id } = req.query;

    const showGoalOfSector = container.resolve(ShowGoalOfSectorService);

    const goalOfSector = await showGoalOfSector.execute({
      sector_id: sector_id ? String(sector_id) : undefined,
      goal_id: goal_id ? String(goal_id) : undefined,
    });

    return res.json(goalOfSector);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { goal_id, sector_id } = req.body;
    const createGoalOfSector = container.resolve(CreateGoalOfSectorService);
    const goalOfSector = await createGoalOfSector.execute({
      goal_id,
      sector_id,
    });
    return res.json(goalOfSector);
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
