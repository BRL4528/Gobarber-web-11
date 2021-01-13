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

import ISubGoalsRepository from '@modules/sub_goals/repositories/ISubGoalsRepository';
import SubGoalsRepository from '@modules/sub_goals/infra/typeorm/repositories/SubGoalsRepository';

import ISubGoalsOfGoalsRepository from '@modules/sub_goals_of_goals/repositories/ISubGoalsOfGoalsRepository';
import SubGoalsOfGoalsRepository from '@modules/sub_goals_of_goals/infra/typeorm/repositories/SubGoalsOfGoalsRepository';

import IGoalsOfSectorsRepository from '@modules/goals_of_sectors/repositories/IGoalsOfSectorsRepository';
import GoalsOfSectorsRepository from '@modules/goals_of_sectors/infra/typeorm/repositories/GoalsOfSectorsRepository';

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

container.registerSingleton<ISubGoalsRepository>(
  'SubGoalsRepository',
  SubGoalsRepository,
);

container.registerSingleton<ISubGoalsOfGoalsRepository>(
  'SubGoalsOfGoalsRepository',
  SubGoalsOfGoalsRepository,
);

container.registerSingleton<IGoalsOfSectorsRepository>(
  'GoalsOfSectorsRepository',
  GoalsOfSectorsRepository,
);
