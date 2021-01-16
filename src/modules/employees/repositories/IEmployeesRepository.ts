import Employee from '../infra/typeorm/entities/Employee';
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';

export default interface IEmployeesRepository {
  findAll(): Promise<Employee[]>;
  findById(id: string): Promise<Employee | undefined>;
  findAllByName(employees: ICreateEmployeeDTO[]): Promise<Employee[]>;
  findByName(name: string): Promise<Employee | undefined>;
  create(data: ICreateEmployeeDTO): Promise<Employee>;
  createAll(employees: ICreateEmployeeDTO[]): Promise<Employee[]>;
  save(sector: Employee): Promise<Employee>;
}
