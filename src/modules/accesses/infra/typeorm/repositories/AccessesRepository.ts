import { getRepository, Repository } from 'typeorm';

import IAccessesRepository from '@modules/accesses/repositories/IAccessesRepository';
import ICreateAccessDTO from '@modules/accesses/dtos/ICreateAccessDTO';

import Access from '@modules/accesses/infra/typeorm/entities/Access';

class AccessesRepository implements IAccessesRepository {
  private ormRepository: Repository<Access>;

  constructor() {
    this.ormRepository = getRepository(Access);
  }

  // public async findAllProviders({
  //   except_user_id,
  // }: IFindAllProvidersDTO): Promise<User[]> {
  //   let users: User[];

  //   if (except_user_id) {
  //     users = await this.ormRepository.find({
  //       where: {
  //         id: Not(except_user_id),
  //       },
  //     });
  //   } else {
  //     users = await this.ormRepository.find();
  //   }

  //   return users;
  // }

  public async findById(id: string): Promise<Access | undefined> {
    const access = await this.ormRepository.findOne(id);

    return access;
  }

  public async findByNickname(nickname: string): Promise<Access | undefined> {
    const access = await this.ormRepository.findOne({
      where: { nickname },
    });

    return access;
  }

  public async create(accessData: ICreateAccessDTO): Promise<Access> {
    console.log(accessData);

    const access = this.ormRepository.create(accessData);

    await this.ormRepository.save(access);

    return access;
  }

  public async save(access: Access): Promise<Access> {
    return this.ormRepository.save(access);
  }
}

export default AccessesRepository;
