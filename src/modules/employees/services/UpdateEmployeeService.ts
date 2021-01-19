import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

import Employee from '../infra/typeorm/entities/Employee';

interface IRequest {
  employee_id: string;
  name?: string;
  cpf?: string;
  salary?: string;
}

@injectable()
class UpdateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({
    employee_id,
    name,
    cpf,
    salary,
  }: IRequest): Promise<Employee> {
    const employee = await this.employeesRepository.findById(employee_id);

    if (!employee) {
      throw new AppError('Employee not exists.');
    }

    if (name) {
      employee.name = name;
    }

    if (cpf) {
      employee.cpf = cpf;
    }

    if (salary) {
      employee.salary = salary;
    }

    return this.employeesRepository.save(employee);
  }
}

export default UpdateEmployeeService;
