import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/accesses/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nickname, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { access, token } = await authenticateUser.execute({
      nickname,
      password,
    });

    return res.json({ access, token });
  }
}
