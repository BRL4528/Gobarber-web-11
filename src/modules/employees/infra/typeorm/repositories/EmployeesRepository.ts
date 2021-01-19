import { getRepository, In, Repository } from 'typeorm';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';

import Employee from '@modules/employees/infra/typeorm/entities/Employee';

class EmployeesRepository implements IEmployeesRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public async findAllByName(
    employees: ICreateEmployeeDTO[],
  ): Promise<Employee[]> {
    const employeesNames = employees.map(employee => employee.name);

    const existsEmployees = await this.ormRepository.find({
      where: {
        name: In(employeesNames),
      },
    });

    return existsEmployees;
  }

  public async findAll(): Promise<Employee[]> {
    const employees = await this.ormRepository.find();

    return employees;
  }

  public async findById(id: string): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne(id);

    return employee;
  }

  public async findByName(name: string): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne({
      where: { name },
    });

    return employee;
  }

  public async createAll(employees: ICreateEmployeeDTO[]): Promise<Employee[]> {
    const employeesAll = this.ormRepository.create(
      employees.map(employee => ({
        name: employee.name,
        cpf: employee.cpf,
        salary: employee.salary,
      })),
    );

    await this.ormRepository.save(employeesAll);

    return employeesAll;
  }

  public async create({
    name,
    cpf,
    salary,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.ormRepository.create({
      name,
      cpf,
      salary,
    });

    await this.ormRepository.save(employee);

    return employee;
  }

  public async save(employee: Employee): Promise<Employee> {
    return this.ormRepository.save(employee);
  }
}

export default EmployeesRepository;
