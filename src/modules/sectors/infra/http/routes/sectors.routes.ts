import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SectorsController from '../controllers/SectorsController';

const sectorsController = new SectorsController();

const sectorsRouter = Router();

sectorsRouter.get('/', sectorsController.index);

sectorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      leader: Joi.string().required(),
    },
  }),
  sectorsController.create,
);

sectorsRouter.put('/', sectorsController.update);

export default sectorsRouter;
