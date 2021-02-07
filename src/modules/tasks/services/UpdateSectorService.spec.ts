import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeSectorsRepository from '../repositories/fakes/FakeSectorsRepository';
import UpdateSectorService from './UpdateSectorService';

let fakeSectorsRepository: FakeSectorsRepository;
// let fakeCacheProvider: FakeCacheProvider;
let updateSector: UpdateSectorService;

describe('updateSector', () => {
  beforeEach(() => {
    fakeSectorsRepository = new FakeSectorsRepository();
    // fakeCacheProvider = new FakeCacheProvider();
    updateSector = new UpdateSectorService(
      fakeSectorsRepository,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able update the sector', async () => {
    const sector = await fakeSectorsRepository.create({
      name: 'Back End',
      leader: 'John Doe',
    });

    const updatedSector = await updateSector.execute({
      sector_id: sector.id,
      name: 'Front End',
      leader: 'Will Doe',
    });

    expect(updatedSector.name).toBe('Front End');
    expect(updatedSector.leader).toBe('Will Doe');
  });

  it('shoulb not be able update the sector from non-existing sector', async () => {
    await expect(
      updateSector.execute({
        sector_id: 'non-existing-sector-id',
        name: 'Back End',
        leader: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
