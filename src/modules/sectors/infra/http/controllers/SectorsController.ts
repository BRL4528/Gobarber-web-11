import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import CreateSectorService from '@modules/sectors/services/CreateSectorService';

export default class SectorsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, leader } = req.body;

    const createSector = container.resolve(CreateSectorService);

    const sector = await createSector.execute({
      name,
      leader,
    });

    return res.json(sector);
  }
}
