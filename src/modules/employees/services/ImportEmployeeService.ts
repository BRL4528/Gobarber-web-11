import { injectable, inject } from 'tsyringe';
import csvParse from 'csv-parse';
import fs from 'fs';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

import Employee from '../infra/typeorm/entities/Employee';

interface IRequest {
  name: string;
  cpf: string;
  salary: string;
  sector: string;
}

@injectable()
class ImportEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute(filePath: string): Promise<IRequest[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const employees: IRequest[] = [];

    parseCSV.on('data', async line => {
      const [name, cpf, salary, sector] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!name || !cpf || !salary || !sector) return;

      employees.push({ name, cpf, salary, sector });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentemployees = await this.employeesRepository.findAllByName(
      employees,
    );

    const existentemployeesNames = existentemployees.map(
      (employee: Employee) => employee.name,
    );

    const addEmployeeNames = employees
      .filter(employee => !existentemployeesNames.includes(employee.name))
      .filter(
        (value, index, self) =>
          self.findIndex(employee => {
            return employee.name === value.name;
          }) === index,
      );

    // if (addEmployeeNames.length < 0) {
    //   throw new AppError('Sub goals disabled');
    // }

    const newemployees = this.employeesRepository.createAll(addEmployeeNames);

    await fs.promises.unlink(filePath);

    return newemployees;
  }
}

export default ImportEmployeeService;
