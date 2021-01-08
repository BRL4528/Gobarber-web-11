import { container } from 'tsyringe';

import '@modules/accesses/providers';
import './providers';

import IAccessTokensRepository from '@modules/accesses/repositories/IAccessTokensRepository';
import AccessTokensRepository from '@modules/accesses/infra/typeorm/repositories/AccessTokensRepository';

import IAccessesRepository from '@modules/accesses/repositories/IAccessesRepository';
import AccessesRepository from '@modules/accesses/infra/typeorm/repositories/AccessesRepository';

import ISectorsRepository from '@modules/sectors/repositories/ISectorsRepository';
import SectorsRepository from '@modules/sectors/infra/typeorm/repositories/SectorsRepository';

import IGoalsRepository from '@modules/goals/repositories/IGoalsRepository';
import GoalsRepository from '@modules/goals/infra/typeorm/repositories/GoalsRepository';

container.registerSingleton<IAccessesRepository>(
  'AccessesRepository',
  AccessesRepository,
);

container.registerSingleton<IAccessTokensRepository>(
  'AccessTokensRepository',
  AccessTokensRepository,
);

container.registerSingleton<ISectorsRepository>(
  'SectorsRepository',
  SectorsRepository,
);

container.registerSingleton<IGoalsRepository>(
  'GoalsRepository',
  GoalsRepository,
);
