import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeAccessesRepository from '../repositories/fakes/FakeAccessesRepository';
import FakeAccessTokensRepository from '../repositories/fakes/FakeAccessTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeAccessesRepository: FakeAccessesRepository;
let fakeAccessTokensRepository: FakeAccessTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeAccessesRepository = new FakeAccessesRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeAccessTokensRepository = new FakeAccessTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeAccessesRepository,
      fakeMailProvider,
      fakeAccessTokensRepository,
    );
  });

  it('shoulb be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeAccessesRepository.create({
      name: 'John Doe',
      nickname: 'john.doe',
      password: '123456',
      tag: 'admin',
    });
    await sendForgotPasswordEmail.execute({
      nickname: 'john.doe',
    });
    expect(sendMail).toHaveBeenCalled();
  });

  it('shoulb not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        nickname: 'john.doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeAccessTokensRepository, 'generate');

    const access = await fakeAccessesRepository.create({
      name: 'John Doe',
      nickname: 'john.doe',
      password: '123456',
      tag: 'admin',
    });

    await sendForgotPasswordEmail.execute({
      nickname: 'john.doe',
    });

    expect(generateToken).toHaveBeenCalledWith(access.id);
  });
});
