import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IAccessesRepository from '../repositories/IAccessesRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Access from '../infra/typeorm/entities/Access';

interface IRequest {
  nickname: string;
  password: string;
}

interface IResponse {
  access: Access;
  token: string;
}

@injectable()
class AuthenticateAccessService {
  constructor(
    @inject('AccessesRepository')
    private accessesRepository: IAccessesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ nickname, password }: IRequest): Promise<IResponse> {
    const access = await this.accessesRepository.findByNickname(nickname);

    if (!access) {
      throw new AppError('Incorrect nickname/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      access.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect nickname/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: access.id,
      expiresIn,
    });

    return { access, token };
  }
}

export default AuthenticateAccessService;
