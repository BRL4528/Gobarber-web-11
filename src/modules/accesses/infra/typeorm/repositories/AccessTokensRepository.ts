import { getRepository, Repository } from 'typeorm';

import IAccessTokensRepository from '@modules/accesses/repositories/IAccessTokensRepository';

import AccessToken from '@modules/accesses/infra/typeorm/entities/AccessToken';

class AccessTokensRepository implements IAccessTokensRepository {
  private ormRepository: Repository<AccessToken>;

  constructor() {
    this.ormRepository = getRepository(AccessToken);
  }

  public async findByToken(token: string): Promise<AccessToken | undefined> {
    const accessToken = await this.ormRepository.findOne({
      where: { token },
    });

    return accessToken;
  }

  public async generate(access_id: string): Promise<AccessToken> {
    const accessToken = this.ormRepository.create({
      access_id,
    });

    await this.ormRepository.save(accessToken);

    return accessToken;
  }
}

export default AccessTokensRepository;
