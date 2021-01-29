import { injectable, inject } from 'tsyringe';
import csvParse from 'csv-parse';
import fs from 'fs';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsRepository from '../repositories/IAnalysisModuleRepository';

import SubGoal from '../infra/typeorm/entities/AnalysisModule';

interface IRequest {
  name: string;
  status: string;
  weight: string;
}

@injectable()
class ImportSubGoalService {
  constructor(
    @inject('SubGoalsRepository')
    private subGoalsRepository: ISubGoalsRepository,
  ) {}

  public async execute(filePath: string): Promise<IRequest[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const subGoals: IRequest[] = [];

    parseCSV.on('data', async line => {
      const [name, status, weight] = line.map((cell: string) => cell.trim());

      if (!name || !status || !weight) return;

      subGoals.push({ name, status, weight });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentSubGoals = await this.subGoalsRepository.findAllByName(
      subGoals,
    );

    const existentSubGoalsNames = existentSubGoals.map(
      (subGoal: SubGoal) => subGoal.name,
    );

    const addSubGoalNames = subGoals
      .filter(subGoal => !existentSubGoalsNames.includes(subGoal.name))
      .filter(
        (value, index, self) =>
          self.findIndex(subGoal => {
            return subGoal.name === value.name;
          }) === index,
      );

    // if (addSubGoalNames.length < 0) {
    //   throw new AppError('Sub goals disabled');
    // }

    const newSubGoals = this.subGoalsRepository.createAll(addSubGoalNames);

    await fs.promises.unlink(filePath);

    return newSubGoals;
  }
}

export default ImportSubGoalService;
