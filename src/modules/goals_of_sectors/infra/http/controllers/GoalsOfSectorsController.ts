import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ShowGoalOfSectorService from '@modules/goals_of_sectors/services/ShowGoalOfSectorService';
import CreateGoalOfSectorService from '@modules/goals_of_sectors/services/CreateGoalOfSectorService';
import CreateAllGoalOfSectorService from '@modules/goals_of_sectors/services/CreateAllGoalOfSectorService';
import UpdateGoalOfSectorService from '@modules/goals_of_sectors/services/UpdateGoalOfSectorService';

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

  public async createAll(req: Request, res: Response): Promise<Response> {
    const { sector_id, goals_ids } = req.body;

    const createGoalsOfSectors = container.resolve(
      CreateAllGoalOfSectorService,
    );
    const goalOfSector = await createGoalsOfSectors.execute({
      sector_id,
      goals_ids,
    });
    return res.json(goalOfSector);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { goal_of_sector_id } = req.query;
    const { status_of_conclusion } = req.body;
    const updateGoalOfSector = container.resolve(UpdateGoalOfSectorService);
    const goalOfSector = await updateGoalOfSector.execute({
      goal_of_sector_id: String(goal_of_sector_id),
      status_of_conclusion,
    });
    return res.json(goalOfSector);
  }
}
