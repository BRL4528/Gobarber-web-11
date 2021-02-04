import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SubGoalsOfGoalsController from '../controllers/SubGoalsOfGoalsController';

const subGoalsOfGoalsController = new SubGoalsOfGoalsController();

const subGoalsOfGoalsRouter = Router();

subGoalsOfGoalsRouter.get('/', subGoalsOfGoalsController.show);

subGoalsOfGoalsRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),
  //     status: Joi.string().required(),
  //     weight: Joi.string().required(),
  //     goals: Joi.array(),
  //   },
  // }),
  subGoalsOfGoalsController.create,
);

subGoalsOfGoalsRouter.post('/create-all', subGoalsOfGoalsController.createAll);

// subGoalsOfGoalsRouter.put('/', subGoalsOfGoalsController.update);

export default subGoalsOfGoalsRouter;
