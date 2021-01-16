import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeSubGoalsRepository from '../repositories/fakes/FakeSubGoalsRepository';
import UpdateSubGoalService from './UpdateSubGoalService';

let fakeSubGoalsRepository: FakeSubGoalsRepository;
// let fakeCacheProvider: FakeCacheProvider;
let updateSubGoal: UpdateSubGoalService;

describe('updateSubGoal', () => {
  beforeEach(() => {
    fakeSubGoalsRepository = new FakeSubGoalsRepository();
    // fakeCacheProvider = new FakeCacheProvider();
    updateSubGoal = new UpdateSubGoalService(
      fakeSubGoalsRepository,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able update the sub goal', async () => {
    const subGoal = await fakeSubGoalsRepository.create({
      name: 'Token',
      status: 'ativo',
      weight: '1',
    });

    const updatedSubGoal = await updateSubGoal.execute({
      sub_goal_id: subGoal.id,
      name: 'Forgot Password',
      status: 'ativo',
      weight: '2',
    });

    expect(updatedSubGoal.name).toBe('Forgot Password');
    expect(updatedSubGoal.weight).toBe('2');
  });

  it('shoulb not be able update the sub goal from non-existing sub goal', async () => {
    await expect(
      updateSubGoal.execute({
        sub_goal_id: 'non-existing-sub-goal-id',
        name: 'John Doe',
        status: 'ativo',
        weight: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
