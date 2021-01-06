import AppError from '@shared/errors/AppError';

import FakeAccessesRepository from '../repositories/fakes/FakeAccessesRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateAccessService from './AuthenticateAccessService';

let fakeAccessesRepository: FakeAccessesRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateAccess: AuthenticateAccessService;

describe('AuthenticateAccess', () => {
  beforeEach(() => {
    fakeAccessesRepository = new FakeAccessesRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateAccess = new AuthenticateAccessService(
      fakeAccessesRepository,
      fakeHashProvider,
    );
  });

  it('shoulb be able to authenticate', async () => {
    const access = await fakeAccessesRepository.create({
      name: 'John Doe',
      nickname: 'john.doe',
      password: '123456',
      tag: 'admin',
    });

    const response = await authenticateAccess.execute({
      nickname: 'john.doe',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.access).toBe(access);
  });

  it('shoulb not be able to authenticate with non existing access', async () => {
    await expect(
      authenticateAccess.execute({
        nickname: 'john.doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoulb not be able to authenticate with wrong password', async () => {
    await fakeAccessesRepository.create({
      name: 'John Doe',
      nickname: 'john.doe',
      password: '123456',
      tag: 'admin',
    });

    await expect(
      authenticateAccess.execute({
        nickname: 'john.doe',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
