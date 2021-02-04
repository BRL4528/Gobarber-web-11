import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';
import SubGoalsController from '../controllers/SubGoalsController';

const subGoalsController = new SubGoalsController();

const subGoalsRouter = Router();
const upload = multer(uploadConfig);

subGoalsRouter.get('/', subGoalsController.index);

subGoalsRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),
  //     status: Joi.string().required(),
  //     weight: Joi.string().required(),
  //     goals: Joi.array(),
  //   },
  // }),
  subGoalsController.create,
);

subGoalsRouter.post(
  '/import',
  upload.single('file'),
  subGoalsController.import,
);

subGoalsRouter.put('/', subGoalsController.update);

export default subGoalsRouter;
