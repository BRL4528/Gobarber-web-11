import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAccessesRepository from '../repositories/IAccessesRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Access from '../infra/typeorm/entities/Access';

interface IRequest {
  name: string;
  nickname: string;
  password: string;
  tag: string;
}

@injectable()
class CreateAccessService {
  constructor(
    @inject('AccessesRepository')
    private accessesRepository: IAccessesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    nickname,
    password,
    tag,
  }: IRequest): Promise<Access> {
    const checkAccessExists = await this.accessesRepository.findByNickname(
      nickname,
    );

    if (checkAccessExists) {
      throw new AppError('Nickname already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const access = await this.accessesRepository.create({
      name,
      nickname,
      password: hashedPassword,
      tag,
    });

    // await this.cacheProvider.invalidatePrefix('providers-list');

    return access;
  }
}

export default CreateAccessService;
