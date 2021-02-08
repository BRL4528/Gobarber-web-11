import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { classToClass } from 'class-transformer';

// import ShowSubOfGoalService from '@modules/tasks_of_sub_goals/services/ShowSubOfGoalService';
import CreateTaskOfSubGoalService from '@modules/tasks_of_sub_goals/services/CreateTaskOfSubGoalService';
import CreateAllTaskOfSubGoalService from '@modules/tasks_of_sub_goals/services/CreateAllTaskOfSubGoalService';
// import UpdateSubGoalService from '@modules/sub_goals_of_goals/services/UpdateSubGoalService';

export default class TasksOfSubGoalsController {
  // public async show(req: Request, res: Response): Promise<Response> {
  //   const { goal_id } = req.query;

  //   const showSubGoalOfGoal = container.resolve(ShowSubOfGoalService);

  //   const subGoalOfGoal = await showSubGoalOfGoal.execute({
  //     goal_id: String(goal_id),
  //   });

  //   return res.json(subGoalOfGoal);
  // }

  public async create(req: Request, res: Response): Promise<Response> {
    const { sub_goal_id, task_id } = req.body;
    const createTaskOfSubGoal = container.resolve(CreateTaskOfSubGoalService);
    const taskOfSubGoal = await createTaskOfSubGoal.execute({
      task_id,
      sub_goal_id,
    });
    return res.json(taskOfSubGoal);
  }

  public async createAll(req: Request, res: Response): Promise<Response> {
    const { sub_goal_id, tasks_ids } = req.body;

    const createTasksOfSubGoals = container.resolve(
      CreateAllTaskOfSubGoalService,
    );
    const taskOfSubGoal = await createTasksOfSubGoals.execute({
      sub_goal_id,
      tasks_ids,
    });
    return res.json(taskOfSubGoal);
  }
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
