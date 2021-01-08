import { getRepository, Repository } from 'typeorm';

import ISectorsRepository from '@modules/sectors/repositories/ISectorsRepository';
import ICreateSectorDTO from '@modules/sectors/dtos/ICreateSectorDTO';

import Sector from '@modules/sectors/infra/typeorm/entities/Sector';

class SectorsRepository implements ISectorsRepository {
  private ormRepository: Repository<Sector>;

  constructor() {
    this.ormRepository = getRepository(Sector);
  }

  public async findById(id: string): Promise<Sector | undefined> {
    const sector = await this.ormRepository.findOne(id);

    return sector;
  }

  public async findByName(name: string): Promise<Sector | undefined> {
    const sector = await this.ormRepository.findOne({
      where: { name },
    });

    return sector;
  }

  public async create(sectorData: ICreateSectorDTO): Promise<Sector> {
    const sector = this.ormRepository.create(sectorData);

    await this.ormRepository.save(sector);

    return sector;
  }

  public async save(sector: Sector): Promise<Sector> {
    return this.ormRepository.save(sector);
  }
}

export default SectorsRepository;
