import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISectorsRepository from '../repositories/ISectorsRepository';

import Sector from '../infra/typeorm/entities/Sector';

interface IRequest {
  name: string;
  leader: string;
}

@injectable()
class CreateSectorService {
  constructor(
    @inject('SectorsRepository')
    private sectorsRepository: ISectorsRepository,
  ) {}

  public async execute({ name, leader }: IRequest): Promise<Sector> {
    const checkSectorExists = await this.sectorsRepository.findByName(name);

    if (checkSectorExists) {
      throw new AppError('Name already used.');
    }

    const sector = await this.sectorsRepository.create({
      name,
      leader,
    });

    return sector;
  }
}

export default CreateSectorService;
