import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeSubGoalsRepository from '../repositories/fakes/FakeSubGoalsRepository';
import CreateSubGoalService from './CreateSubGoalService';

let fakeSubGoalsRepository: FakeSubGoalsRepository;
// let fakeCacheProvider: FakeCacheProvider;
let createSubGoal: CreateSubGoalService;

describe('createSubGoal', () => {
  beforeEach(() => {
    fakeSubGoalsRepository = new FakeSubGoalsRepository();
    // fakeCacheProvider = new FakeCacheProvider();
    createSubGoal = new CreateSubGoalService(
      fakeSubGoalsRepository,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able to create a new sub goal', async () => {
    const subGoal = await createSubGoal.execute({
      name: 'Token',
      status: 'ativo',
      weight: '1',
    });

    expect(subGoal).toHaveProperty('id');
  });

  it('shoulb not be able to create a new sub goal with same name from another', async () => {
    await createSubGoal.execute({
      name: 'Token',
      status: 'ativo',
      weight: '1',
    });

    await expect(
      createSubGoal.execute({
        name: 'Token',
        status: 'ativo',
        weight: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
