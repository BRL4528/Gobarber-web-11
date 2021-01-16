import { injectable, inject } from 'tsyringe';
import csvParse from 'csv-parse';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ISubGoalsRepository from '../repositories/ISubGoalsRepository';

import SubGoal from '../infra/typeorm/entities/SubGoal';

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

    // const subGoalsNames = subGoals.map(subGoal => subGoal.name);

    const addSubGoalNames = subGoals
      .filter(subGoal => !existentSubGoalsNames.includes(subGoal.name))
      .filter((value, index, array) => array.indexOf(value) === index);

    console.log(addSubGoalNames);

    // const checkSubGoalsExists = await this.subGoalsRepository.findByName(name);

    // if (checkSubGoalsExists) {
    //   throw new AppError('Name already used.');
    // }

    // const subGoal = await this.subGoalsRepository.create({
    //   name,
    //   status,
    //   weight,
    // });

    return subGoals;
  }
}

export default ImportSubGoalService;
