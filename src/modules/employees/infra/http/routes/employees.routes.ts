import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';
import EmployeesController from '../controllers/EmployeesController';

const employeesController = new EmployeesController();

const employeesRouter = Router();
const upload = multer(uploadConfig);

// employeesRouter.get('/', employeesController.index);

// employeesRouter.post(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       status: Joi.string().required(),
//       weight: Joi.string().required(),
//       goals: Joi.array(),
//     },
//   }),
//   employeesController.create,
// );

employeesRouter.post(
  '/import',
  upload.single('file'),
  employeesController.import,
);

// employeesRouter.put('/', employeesController.update);

export default employeesRouter;
