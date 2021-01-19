import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

import Employee from '../infra/typeorm/entities/Employee';

@injectable()
class ListEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute(): Promise<Employee[]> {
    const employees = await this.employeesRepository.findAll();

    return employees;
  }
}

export default ListEmployeeService;
