import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import TasksOfSubGoalsController from '../controllers/TasksOfSubGoalsController';

const tasksOfSubGoalsController = new TasksOfSubGoalsController();

const tasksOfSubGoalsRouter = Router();

// tasksOfSubGoalsRouter.get('/', tasksOfSubGoalsController.show);

tasksOfSubGoalsRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),
  //     status: Joi.string().required(),
  //     weight: Joi.string().required(),
  //     goals: Joi.array(),
  //   },
  // }),
  tasksOfSubGoalsController.create,
);

// tasksOfSubGoalsRouter.post('/create-all', tasksOfSubGoalsController.createAll);

// tasksOfSubGoalsRouter.put('/', tasksOfSubGoalsController.update);

export default tasksOfSubGoalsRouter;
