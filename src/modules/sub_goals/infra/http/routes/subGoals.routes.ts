import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SubGoalsController from '../controllers/SubGoalsController';

const subGoalsController = new SubGoalsController();

const subGoalsRouter = Router();

subGoalsRouter.get('/', subGoalsController.index);

subGoalsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      status: Joi.string().required(),
      weight: Joi.string().required(),
      goals: Joi.array(),
    },
  }),
  subGoalsController.create,
);

subGoalsRouter.put('/', subGoalsController.update);

export default subGoalsRouter;
