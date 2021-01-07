import AccessToken from '../infra/typeorm/entities/AccessToken';

export default interface IAccessTokensRepository {
  generate(access_id: string): Promise<AccessToken>;
  findByToken(token: string): Promise<AccessToken | undefined>;
}
