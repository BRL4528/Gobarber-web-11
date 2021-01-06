import Access from '../infra/typeorm/entities/Access';
import ICreateAccessDTO from '../dtos/ICreateAccessDTO';
// import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IAccessesRepository {
  // findAllProviders(except_access_id?: IFindAllProvidersDTO): Promise<Access[]>;
  findById(id: string): Promise<Access | undefined>;
  findByNickname(nickname: string): Promise<Access | undefined>;
  create(data: ICreateAccessDTO): Promise<Access>;
  save(access: Access): Promise<Access>;
}
