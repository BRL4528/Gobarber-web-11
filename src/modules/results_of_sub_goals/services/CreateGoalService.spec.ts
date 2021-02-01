import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeGoalsRepository from '../repositories/fakes/FakeGoalsRepository';
import CreateGoalService from './CreateResultOfSubGoalService';

let fakeGoalsRepository: FakeGoalsRepository;
// let fakeCacheProvider: FakeCacheProvider;
let createGoal: CreateGoalService;

describe('createGoal', () => {
  beforeEach(() => {
    fakeGoalsRepository = new FakeGoalsRepository();
    // fakeCacheProvider = new FakeCacheProvider();
    createGoal = new CreateGoalService(
      fakeGoalsRepository,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able to create a new goal', async () => {
    const goal = await createGoal.execute({
      name: 'Back End',
      status: 'ativo',
      weight: '2',
    });

    expect(goal).toHaveProperty('id');
  });

  it('shoulb not be able to create a new goal with same name from another', async () => {
    await createGoal.execute({
      name: 'Back End',
      status: 'ativo',
      weight: '2',
    });

    await expect(
      createGoal.execute({
        name: 'Back End',
        status: 'ativo',
        weight: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
