import { uuid } from 'uuidv4';

import IAccessTokensRepository from '@modules/accesses/repositories/IAccessTokensRepository';

import AccessToken from '@modules/accesses/infra/typeorm/entities/AccessToken';

class FakeAccessTokensRepository implements IAccessTokensRepository {
  private acessTokens: AccessToken[] = [];

  public async generate(access_id: string): Promise<AccessToken> {
    const accessToken = new AccessToken();

    Object.assign(accessToken, {
      id: uuid(),
      token: uuid(),
      access_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.acessTokens.push(accessToken);

    return accessToken;
  }

  public async findByToken(token: string): Promise<AccessToken | undefined> {
    const accessToken = this.acessTokens.find(
      findToken => findToken.token === token,
    );

    return accessToken;
  }
}

export default FakeAccessTokensRepository;
