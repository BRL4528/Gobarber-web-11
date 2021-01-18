import { injectable, inject } from 'tsyringe';
import csvParse from 'csv-parse';
import fs from 'fs';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISectorsRepository from '../repositories/ISectorsRepository';

import Sector from '../infra/typeorm/entities/Sector';

interface IRequest {
  name: string;
  leader: string;
}

@injectable()
class ImportSectorService {
  constructor(
    @inject('SectorsRepository')
    private sectorsRepository: ISectorsRepository,
  ) {}

  public async execute(filePath: string): Promise<IRequest[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const sectors: IRequest[] = [];

    parseCSV.on('data', async line => {
      const [name, leader] = line.map((cell: string) => cell.trim());

      if (!name || !leader) return;

      sectors.push({ name, leader });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentSectors = await this.sectorsRepository.findAllByName(sectors);

    const existentSectorsNames = existentSectors.map(
      (sector: Sector) => sector.name,
    );

    const addSectorNames = sectors
      .filter(sector => !existentSectorsNames.includes(sector.name))
      .filter(
        (value, index, self) =>
          self.findIndex(sector => {
            return sector.name === value.name;
          }) === index,
      );

    // if (addSectorNames.length < 0) {
    //   throw new AppError('Sectors disabled');
    // }

    const newSectors = this.sectorsRepository.createAll(addSectorNames);

    await fs.promises.unlink(filePath);

    return newSectors;
  }
}

export default ImportSectorService;
