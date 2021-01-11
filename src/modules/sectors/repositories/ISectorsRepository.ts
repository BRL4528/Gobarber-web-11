import Sector from '../infra/typeorm/entities/Sector';
import ICreateSectorDTO from '../dtos/ICreateSectorDTO';

interface IFindSectors {
  id: string;
}
export default interface ISectorsRepository {
  findAll(): Promise<Sector[] | undefined>;
  findAllById(sectors: IFindSectors[]): Promise<Sector[]>;
  findById(id: string): Promise<Sector | undefined>;
  findByName(name: string): Promise<Sector | undefined>;
  create(data: ICreateSectorDTO): Promise<Sector>;
  save(sector: Sector): Promise<Sector>;
}
