import { injectable, inject } from 'tsyringe';
// import path from 'path';

import AppError from '@shared/errors/AppError';
// import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IAccessesRepository from '../repositories/IAccessesRepository';
import IAccessTokensRepository from '../repositories/IAccessTokensRepository';

interface IRequest {
  nickname: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('AccessesRepository')
    private accessesRepository: IAccessesRepository,

    // @inject('MailProvider')
    // private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IAccessTokensRepository,
  ) {}

  public async execute({ nickname }: IRequest): Promise<void> {
    const access = await this.accessesRepository.findByNickname(nickname);

    if (!access) {
      throw new AppError('User does not exists.');
    }

    // const { token } = await this.userTokensRepository.generate(user.id);

    // const forgotPasswordTemplate = path.resolve(
    //   __dirname,
    //   '..',
    //   'views',
    //   'forgot_password.hbs',
    // );

    // await this.mailProvider.sendMail({
    //   to: {
    //     name: user.name,
    //     nickname: user.nickname,
    //   },
    //   subject: '[GoBarber] Recuperação de senha',
    //   templateData: {
    //     file: forgotPasswordTemplate,
    //     variables: {
    //       name: user.name,
    //       link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
    //     },
    //   },
    // });
  }
}

export default SendForgotPasswordEmailService;
