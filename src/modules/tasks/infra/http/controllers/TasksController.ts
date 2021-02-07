import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import ListTaskService from '@modules/tasks/services/ListTaskService';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import CreateAllTaskService from '@modules/tasks/services/CreateAllTaskService';
// import UpdateSectorService from '@modules/tasks/services/UpdateSectorService';
// import ImportSectorService from '@modules/tasks/services/ImportSectorService';

export default class TasksController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listTask = container.resolve(ListTaskService);

    const task = await listTask.execute();

    return res.json(task);
  }

  // public async import(req: Request, res: Response): Promise<Response> {
  //   const importSector = container.resolve(ImportSectorService);

  //   const sectors = await importSector.execute(req.file.path);

  //   return res.json(sectors);
  // }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, weight, observations } = req.body;

    const createTask = container.resolve(CreateTaskService);

    const task = await createTask.execute({
      name,
      weight,
      observations,
    });

    return res.json(task);
  }

  public async createAll(req: Request, res: Response): Promise<Response> {
    const { tasks } = req.body;

    const createAllTask = container.resolve(CreateAllTaskService);

    const createdTasks = await createAllTask.execute(tasks);

    return res.json(createdTasks);
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { sector_id } = req.query;
  //   const { name, leader } = req.body;

  //   const updateSector = container.resolve(UpdateSectorService);

  //   const sector = await updateSector.execute({
  //     sector_id: String(sector_id),
  //     name,
  //     leader,
  //   });

  //   return res.json(sector);
  // }
}
