import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAccessesRepository from '../repositories/fakes/FakeAccessesRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateAccessService from './CreateAccessService';

let fakeAccessesRepository: FakeAccessesRepository;
let fakeHashProvider: FakeHashProvider;
// let fakeCacheProvider: FakeCacheProvider;
let createAccess: CreateAccessService;

describe('createAccess', () => {
  beforeEach(() => {
    fakeAccessesRepository = new FakeAccessesRepository();
    fakeHashProvider = new FakeHashProvider();
    // fakeCacheProvider = new FakeCacheProvider();
    createAccess = new CreateAccessService(
      fakeAccessesRepository,
      fakeHashProvider,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able to create a new access', async () => {
    const access = await createAccess.execute({
      name: 'John Doe',
      nickname: 'john.doe',
      password: '123456',
      tag: 'admin',
    });

    expect(access).toHaveProperty('id');
  });

  it('shoulb not be able to create a new access with same email from another', async () => {
    await createAccess.execute({
      name: 'John Doe',
      nickname: 'john.doe',
      password: '123456',
      tag: 'admin',
    });

    await expect(
      createAccess.execute({
        name: 'John Doe',
        nickname: 'john.doe',
        password: '123456',
        tag: 'admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
