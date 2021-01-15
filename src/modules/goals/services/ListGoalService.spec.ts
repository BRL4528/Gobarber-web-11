// import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeGoalsRepository from '../repositories/fakes/FakeGoalsRepository';
import ListGoalService from './ListGoalService';

let fakeGoalsRepository: FakeGoalsRepository;
// let fakeCacheProvider: FakeCacheProvider;
let listGoal: ListGoalService;

describe('listGoal', () => {
  beforeEach(() => {
    fakeGoalsRepository = new FakeGoalsRepository();
    // fakeCacheProvider = new FakeCacheProvider();
    listGoal = new ListGoalService(
      fakeGoalsRepository,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able to list the goals', async () => {
    const user1 = await fakeGoalsRepository.create({
      name: 'Back End',
      status: 'ativo',
      weight: '2',
    });

    const user2 = await fakeGoalsRepository.create({
      name: 'Front End',
      status: 'ativo',
      weight: '2',
    });

    const user3 = await fakeGoalsRepository.create({
      name: 'React.js',
      status: 'ativo',
      weight: '2',
    });

    const goals = await listGoal.execute();

    expect(goals).toEqual([user1, user2, user3]);
  });
});
