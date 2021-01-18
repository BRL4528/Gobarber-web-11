import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';
import SectorsController from '../controllers/SectorsController';

const sectorsController = new SectorsController();

const sectorsRouter = Router();
const upload = multer(uploadConfig);

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

sectorsRouter.post('/import', upload.single('file'), sectorsController.import);

sectorsRouter.put('/', sectorsController.update);

export default sectorsRouter;
