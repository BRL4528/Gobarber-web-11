import { uuid } from 'uuidv4';

import IAccessesRepository from '@modules/accesses/repositories/IAccessesRepository';
import ICreateAccessDTO from '@modules/accesses/dtos/ICreateAccessDTO';

import Access from '@modules/accesses/infra/typeorm/entities/Access';

class FakeAccessesRepository implements IAccessesRepository {
  private accesses: Access[] = [];

  public async findById(id: string): Promise<Access | undefined> {
    const findAccess = this.accesses.find(access => access.id === id);

    return findAccess;
  }

  public async findByNickname(nickname: string): Promise<Access | undefined> {
    const findAccess = this.accesses.find(
      access => access.nickname === nickname,
    );

    return findAccess;
  }

  public async create(accessData: ICreateAccessDTO): Promise<Access> {
    const access = new Access();

    Object.assign(access, { id: uuid() }, accessData);

    this.accesses.push(access);

    return access;
  }

  public async save(access: Access): Promise<Access> {
    const findIndex = this.accesses.findIndex(
      findAccess => findAccess.id === access.id,
    );

    this.accesses[findIndex] = access;

    return access;
  }
}

export default FakeAccessesRepository;
