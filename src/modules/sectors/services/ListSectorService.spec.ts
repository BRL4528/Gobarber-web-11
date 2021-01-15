// import AppError from '@shared/errors/AppError';

// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeSectorsRepository from '../repositories/fakes/FakeSectorsRepository';
import ListSectorService from './ListSectorService';

let fakeSectorsRepository: FakeSectorsRepository;
// let fakeCacheProvider: FakeCacheProvider;
let listSector: ListSectorService;

describe('listSector', () => {
  beforeEach(() => {
    fakeSectorsRepository = new FakeSectorsRepository();
    // fakeCacheProvider = new FakeCacheProvider();
    listSector = new ListSectorService(
      fakeSectorsRepository,
      // fakeCacheProvider,
    );
  });

  it('shoulb be able to list the sectors', async () => {
    const user1 = await fakeSectorsRepository.create({
      name: 'Back End',
      leader: 'John Doe',
    });

    const user2 = await fakeSectorsRepository.create({
      name: 'Front End',
      leader: 'Will Doe',
    });

    const user3 = await fakeSectorsRepository.create({
      name: 'React.js',
      leader: 'Jolie Doe',
    });

    const sectors = await listSector.execute();

    expect(sectors).toEqual([user1, user2, user3]);
  });
});
