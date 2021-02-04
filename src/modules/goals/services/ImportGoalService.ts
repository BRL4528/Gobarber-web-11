import { injectable, inject } from 'tsyringe';
import csvParse from 'csv-parse';
import fs from 'fs';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGoalsRepository from '../repositories/IGoalsRepository';

import Goal from '../infra/typeorm/entities/Goal';

interface IRequest {
  name: string;
  status: string;
  weight: number;
  source: number;
  observations: string;
  type: string;
}

@injectable()
class ImportGoalService {
  constructor(
    @inject('GoalsRepository')
    private goalsRepository: IGoalsRepository,
  ) {}

  public async execute(filePath: string): Promise<IRequest[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const goals: IRequest[] = [];

    parseCSV.on('data', async line => {
      const [
        name,
        status,
        weight,
        source,
        observations,
        type,
      ] = line.map((cell: string) => cell.trim());

      if (!name || !status || !weight || !source || !observations || !type)
        return;

      goals.push({ name, status, weight, source, observations, type });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentGoals = await this.goalsRepository.findAllByName(goals);

    const existentGoalsNames = existentGoals.map((goal: Goal) => goal.name);

    const addGoalNames = goals
      .filter(goal => !existentGoalsNames.includes(goal.name))
      .filter(
        (value, index, self) =>
          self.findIndex(goal => {
            return goal.name === value.name;
          }) === index,
      );

    // if (addGoalNames.length < 0) {
    //   throw new AppError('Goals disabled');
    // }

    const newGoals = this.goalsRepository.createAll(addGoalNames);

    await fs.promises.unlink(filePath);

    return newGoals;
  }
}

export default ImportGoalService;
