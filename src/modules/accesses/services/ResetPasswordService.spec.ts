import AppError from '@shared/errors/AppError';

import FakeAccessesRepository from '../repositories/fakes/FakeAccessesRepository';
import FakeAccessTokensRepository from '../repositories/fakes/FakeAccessTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeAccessesRepository: FakeAccessesRepository;
let fakeAccessTokensRepository: FakeAccessTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeAccessesRepository = new FakeAccessesRepository();
    fakeAccessTokensRepository = new FakeAccessTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeAccessesRepository,
      fakeAccessTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const access = await fakeAccessesRepository.create({
      name: 'John Doe',
      nickname: 'john.doe',
      password: '123456',
      tag: 'admin',
    });

    const { token } = await fakeAccessTokensRepository.generate(access.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updateAccess = await fakeAccessesRepository.findById(access.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateAccess?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing access', async () => {
    const { token } = await fakeAccessTokensRepository.generate(
      'non-existing-access',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset password if passed more than 2 hours', async () => {
    const access = await fakeAccessesRepository.create({
      name: 'John Doe',
      nickname: 'john.doe',
      password: '123456',
      tag: 'admin',
    });

    const { token } = await fakeAccessTokensRepository.generate(access.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
