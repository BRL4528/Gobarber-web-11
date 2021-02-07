import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISectorsRepository from '../repositories/ITasksRepository';

import Sector from '../infra/typeorm/entities/Task';

interface IRequest {
  sector_id: string;
  name?: string;
  leader?: string;
}

@injectable()
class UpdateSectorService {
  constructor(
    @inject('SectorsRepository')
    private sectorsRepository: ISectorsRepository,
  ) {}

  public async execute({ name, leader, sector_id }: IRequest): Promise<Sector> {
    const sector = await this.sectorsRepository.findById(sector_id);

    if (!sector) {
      throw new AppError('Sector not exists.');
    }

    if (name) {
      sector.name = name;
    }

    if (leader) {
      sector.leader = leader;
    }

    return this.sectorsRepository.save(sector);
  }
}

export default UpdateSectorService;
