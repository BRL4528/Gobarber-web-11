import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

// import ListSubGoalService from '@modules/employees/services/ListSubGoalService';
// import CreateSubGoalService from '@modules/employees/services/CreateSubGoalService';
// import UpdateSubGoalService from '@modules/employees/services/UpdateSubGoalService';
import ImportEmployeeService from '@modules/employees/services/ImportEmployeeService';

export default class EmployeesController {
  // public async index(req: Request, res: Response): Promise<Response> {
  //   const listSubGoal = container.resolve(ListSubGoalService);

  //   const subGoal = await listSubGoal.execute();

  //   return res.json(subGoal);
  // }

  public async import(req: Request, res: Response): Promise<Response> {
    const importEmployee = container.resolve(ImportEmployeeService);

    const employees = await importEmployee.execute(req.file.path);

    return res.json(employees);
  }

  // public async create(req: Request, res: Response): Promise<Response> {
  //   const { name, status, weight } = req.body;

  //   const createSubGoal = container.resolve(CreateSubGoalService);

  //   const subGoal = await createSubGoal.execute({
  //     name,
  //     status,
  //     weight,
  //   });

  //   return res.json(subGoal);
  // }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { sub_goal_id } = req.query;
  //   const { name, status, weight } = req.body;

  //   const updateSubGoal = container.resolve(UpdateSubGoalService);

  //   const subGoal = await updateSubGoal.execute({
  //     sub_goal_id: String(sub_goal_id),
  //     name,
  //     status,
  //     weight,
  //   });

  //   return res.json(subGoal);
  // }
}
