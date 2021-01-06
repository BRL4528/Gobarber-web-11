import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import AccessesController from '../controllers/AccessesController';

const accessesController = new AccessesController();

const accessesRouter = Router();

accessesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      nickname: Joi.string().required(),
      password: Joi.string().required(),
      tag: Joi.string().required(),
    },
  }),
  accessesController.create,
);

export default accessesRouter;
