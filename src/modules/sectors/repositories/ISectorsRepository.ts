import Sector from '../infra/typeorm/entities/Sector';
import ICreateSectorDTO from '../dtos/ICreateSectorDTO';

export default interface ISectorsRepository {
  findAllByName(subGoals: ICreateSectorDTO[]): Promise<Sector[]>;
  findAll(): Promise<Sector[]>;
  findById(id: string): Promise<Sector | undefined>;
  findByName(name: string): Promise<Sector | undefined>;
  create(data: ICreateSectorDTO): Promise<Sector>;
  createAll(sectors: ICreateSectorDTO[]): Promise<Sector[]>;
  save(sector: Sector): Promise<Sector>;
}
