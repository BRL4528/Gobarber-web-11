import { container } from 'tsyringe';

// import '@modules/users/providers';
import '@modules/accesses/providers';
import './providers';

// import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
// import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IAccessTokensRepository from '@modules/accesses/repositories/IAccessTokensRepository';
import AccessTokensRepository from '@modules/accesses/infra/typeorm/repositories/AccessTokensRepository';

// import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
// import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IAccessesRepository from '@modules/accesses/repositories/IAccessesRepository';
import AccessesRepository from '@modules/accesses/infra/typeorm/repositories/AccessesRepository';

container.registerSingleton<IAccessesRepository>(
  'AccessesRepository',
  AccessesRepository,
);

container.registerSingleton<IAccessTokensRepository>(
  'AccessTokensRepository',
  AccessTokensRepository,
);

// container.registerSingleton<IAppointmentsRepository>(
//   'AppointmentsRepository',
//   AppointmentsRepository,
// );

// container.registerSingleton<IUsersRepository>(
//   'UsersRepository',
//   UsersRepository,
// );

// container.registerSingleton<INotificationsRepository>(
//   'NotificationsRepository',
//   NotificationsRepository,
// );
