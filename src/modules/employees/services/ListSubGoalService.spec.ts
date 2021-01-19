// import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeSubGoalsRepository from '../repositories/fakes/FakeSubGoalsRepository';
import ListSubGoalService from './ListEmployeeService';

let fakeSubGoalsRepository: FakeSubGoalsRepository;
// let fakeCacheProvider: FakeCacheProvider;
let listSubGoal: ListSubGoalService;

describe('listSubGoal', () => {
  beforeEach(() => {
    fakeSubGoalsRepository = new FakeSubGoalsRepository();
    // fakeCacheProvider = new FakeCacheProvider();
    listSubGoal = new ListSubGoalService(
      fakeSubGoalsRepository,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able to list the sub goals', async () => {
    const user1 = await fakeSubGoalsRepository.create({
      name: 'Token',
      status: 'ativo',
      weight: '1',
    });

    const user2 = await fakeSubGoalsRepository.create({
      name: 'Reset Password',
      status: 'ativo',
      weight: '1',
    });

    const user3 = await fakeSubGoalsRepository.create({
      name: 'Forgot Password',
      status: 'ativo',
      weight: '1',
    });

    const subGoals = await listSubGoal.execute();

    expect(subGoals).toEqual([user1, user2, user3]);
  });
});
