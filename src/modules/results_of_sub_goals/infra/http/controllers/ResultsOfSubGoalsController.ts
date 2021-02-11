import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

import CreateResultOfSubGoalService from '@modules/results_of_sub_goals/services/CreateResultOfSubGoalService';
import ListGoalService from '@modules/results_of_sub_goals/services/ListGoalService';
// import UpdateGoalService from '@modules/results_of_sub_goals/services/UpdateGoalService';
import CreateAllResultOfSubGoalService from '@modules/results_of_sub_goals/services/CreateAllResultOfSubGoalService';
// import ImportGoalService from '@modules/results_of_sub_goals/services/ImportGoalService';

export default class ResultsOfSubGoalsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listGoal = container.resolve(ListGoalService);

    const goals = await listGoal.execute();

    return res.json(goals);
  }

  // public async import(req: Request, res: Response): Promise<Response> {
  //   const importGoal = container.resolve(ImportGoalService);

  //   const goals = await importGoal.execute(req.file.path);

  //   return res.json(goals);
  // }

  public async create(req: Request, res: Response): Promise<Response> {
    const { result, sub_goal_id, goal_id, sector_id } = req.body;

    const createResultOfSubGoal = container.resolve(
      CreateResultOfSubGoalService,
    );

    const resultOfSubGoal = await createResultOfSubGoal.execute({
      result,
      sub_goal_id,
      goal_id,
      sector_id,
    });

    return res.json(resultOfSubGoal);
  }

  public async createAll(req: Request, res: Response): Promise<Response> {
    const { results_of_sub_goals } = req.body;

    const createResultsOfSubGoals = container.resolve(
      CreateAllResultOfSubGoalService,
    );
    const resultOfSubGoal = await createResultsOfSubGoals.execute(
      results_of_sub_goals,
    );
    return res.json(resultOfSubGoal);
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { goal_id } = req.query;
  //   const { name, status, weight } = req.body;

  //   const updateGoal = container.resolve(UpdateGoalService);

  //   const goal = await updateGoal.execute({
  //     goal_id: String(goal_id),
  //     name,
  //     status,
  //     weight,
  //   });

  //   return res.json(goal);
  // }
}
