import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeSectorsRepository from '../repositories/fakes/FakeSectorsRepository';
import CreateSectorService from './CreateSectorService';

let fakeSectorsRepository: FakeSectorsRepository;
// let fakeCacheProvider: FakeCacheProvider;
let createSector: CreateSectorService;

describe('createSector', () => {
  beforeEach(() => {
    fakeSectorsRepository = new FakeSectorsRepository();
    // fakeCacheProvider = new FakeCacheProvider();
    createSector = new CreateSectorService(
      fakeSectorsRepository,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able to create a new sector', async () => {
    const sector = await createSector.execute({
      name: 'Back End',
      leader: 'John Doe',
    });

    expect(sector).toHaveProperty('id');
  });

  it('shoulb not be able to create a new sector with same name from another', async () => {
    await createSector.execute({
      name: 'Back End',
      leader: 'John Doe',
    });

    await expect(
      createSector.execute({
        name: 'Back End',
        leader: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
