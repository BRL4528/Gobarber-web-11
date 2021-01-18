import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';
import GoalsController from '../controllers/GoalsController';

const goalsController = new GoalsController();

const goalsRouter = Router();
const upload = multer(uploadConfig);

goalsRouter.get('/', goalsController.index);

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

goalsRouter.post('/import', upload.single('file'), goalsController.import);

goalsRouter.put('/', goalsController.update);

export default goalsRouter;
