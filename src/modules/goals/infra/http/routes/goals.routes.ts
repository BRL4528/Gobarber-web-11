import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import GoalsController from '../controllers/GoalsController';

const goalsController = new GoalsController();

const goalsRouter = Router();

goalsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      status: Joi.string().required(),
      weight: Joi.string().required(),
    },
  }),
  goalsController.create,
);

export default goalsRouter;
