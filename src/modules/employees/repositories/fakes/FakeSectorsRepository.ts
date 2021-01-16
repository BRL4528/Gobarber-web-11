import { uuid } from 'uuidv4';

import ISectorsRepository from '@modules/sectors/repositories/ISectorsRepository';
import ICreateSectorDTO from '@modules/sectors/dtos/ICreateSectorDTO';

import Sector from '@modules/sectors/infra/typeorm/entities/Sector';

class FakeSectorsRepository implements ISectorsRepository {
  private sectors: Sector[] = [];

  public async findAll(): Promise<Sector[]> {
    const findSectors = this.sectors.filter(sector => sector);

    return findSectors;
  }

  public async findById(id: string): Promise<Sector | undefined> {
    const findSector = this.sectors.find(sector => sector.id === id);

    return findSector;
  }

  public async findByName(name: string): Promise<Sector | undefined> {
    const findSector = this.sectors.find(sector => sector.name === name);

    return findSector;
  }

  public async create(sectorData: ICreateSectorDTO): Promise<Sector> {
    const sector = new Sector();

    Object.assign(sector, { id: uuid() }, sectorData);

    this.sectors.push(sector);

    return sector;
  }

  public async save(sector: Sector): Promise<Sector> {
    const findIndex = this.sectors.findIndex(
      findSector => findSector.id === sector.id,
    );

    this.sectors[findIndex] = sector;

    return sector;
  }
}

export default FakeSectorsRepository;
