import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

import Employee from '../infra/typeorm/entities/Employee';

interface IRequest {
  name: string;
  cpf: string;
  salary: string;
}

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({ name, cpf, salary }: IRequest): Promise<Employee> {
    const checkEmployeesExists = await this.employeesRepository.findByName(
      name,
    );

    if (checkEmployeesExists) {
      throw new AppError('Employee already used.');
    }

    const employee = await this.employeesRepository.create({
      name,
      cpf,
      salary,
    });

    return employee;
  }
}

export default CreateEmployeeService;
