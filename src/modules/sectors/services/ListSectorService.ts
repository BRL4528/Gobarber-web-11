import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISectorsRepository from '../repositories/ISectorsRepository';

import Sector from '../infra/typeorm/entities/Sector';

@injectable()
class CreateSectorService {
  constructor(
    @inject('SectorsRepository')
    private sectorsRepository: ISectorsRepository,
  ) {}

  public async execute(): Promise<Sector[]> {
    const sectors = await this.sectorsRepository.findAll();

    return sectors;
  }
}

export default CreateSectorService;
