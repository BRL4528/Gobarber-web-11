import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeGoalsRepository from '../repositories/fakes/FakeGoalsRepository';
import UpdateGoalService from './UpdateGoalService';

let fakeGoalsRepository: FakeGoalsRepository;
// let fakeCacheProvider: FakeCacheProvider;
let updateGoal: UpdateGoalService;

describe('updateGoal', () => {
  beforeEach(() => {
    fakeGoalsRepository = new FakeGoalsRepository();
    // fakeCacheProvider = new FakeCacheProvider();
    updateGoal = new UpdateGoalService(
      fakeGoalsRepository,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able update the goal', async () => {
    const goal = await fakeGoalsRepository.create({
      name: 'Back End',
      status: 'ativo',
      weight: '1',
    });

    const updatedGoal = await updateGoal.execute({
      goal_id: goal.id,
      name: 'Front End',
      status: 'ativo',
      weight: '2',
    });

    expect(updatedGoal.name).toBe('Front End');
    expect(updatedGoal.weight).toBe('2');
  });

  it('shoulb not be able update the goal from non-existing goal', async () => {
    await expect(
      updateGoal.execute({
        goal_id: 'non-existing-goal-id',
        name: 'Back End',
        status: 'ativo',
        weight: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
