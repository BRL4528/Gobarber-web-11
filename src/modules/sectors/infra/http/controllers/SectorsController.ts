import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ListSectorService from '@modules/sectors/services/ListSectorService';
import CreateSectorService from '@modules/sectors/services/CreateSectorService';
import UpdateSectorService from '@modules/sectors/services/UpdateSectorService';

export default class SectorsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listSector = container.resolve(ListSectorService);

    const sector = await listSector.execute();

    return res.json(sector);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, leader } = req.body;

    const createSector = container.resolve(CreateSectorService);

    const sector = await createSector.execute({
      name,
      leader,
    });

    return res.json(sector);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { sector_id } = req.query;
    const { name, leader } = req.body;

    const updateSector = container.resolve(UpdateSectorService);

    const sector = await updateSector.execute({
      sector_id: String(sector_id),
      name,
      leader,
    });

    return res.json(sector);
  }
}
