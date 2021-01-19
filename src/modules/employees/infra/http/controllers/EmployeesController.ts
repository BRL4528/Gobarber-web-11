import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ListEmployeeService from '@modules/employees/services/ListEmployeeService';
import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import UpdateEmployeeService from '@modules/employees/services/UpdateEmployeeService';
import ImportEmployeeService from '@modules/employees/services/ImportEmployeeService';

export default class EmployeesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listEmployee = container.resolve(ListEmployeeService);

    const employee = await listEmployee.execute();

    return res.json(employee);
  }

  public async import(req: Request, res: Response): Promise<Response> {
    const importEmployee = container.resolve(ImportEmployeeService);

    const employees = await importEmployee.execute(req.file.path);

    return res.json(employees);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cpf, salary } = req.body;

    const createEmployee = container.resolve(CreateEmployeeService);

    const employee = await createEmployee.execute({
      name,
      cpf,
      salary,
    });

    return res.json(employee);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { employee_id } = req.query;
    const { name, cpf, salary } = req.body;

    const updateEmployee = container.resolve(UpdateEmployeeService);

    const employee = await updateEmployee.execute({
      employee_id: String(employee_id),
      name,
      cpf,
      salary,
    });

    return res.json(employee);
  }
}
