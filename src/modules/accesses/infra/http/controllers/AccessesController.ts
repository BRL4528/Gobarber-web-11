import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import CreateAccessService from '@modules/accesses/services/CreateAccessService';

export default class AccessesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, nickname, password, tag } = req.body;

    const createAccess = container.resolve(CreateAccessService);

    const access = await createAccess.execute({
      name,
      nickname,
      password,
      tag,
    });

    return res.json(access);
  }
}
