import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';
// import multer from 'multer';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// import uploadConfig from '@config/upload';
import TasksController from '../controllers/TasksController';

const tasksController = new TasksController();

const tasksRouter = Router();
// const upload = multer(uploadConfig);

tasksRouter.get('/', tasksController.index);

tasksRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),
  //     leader: Joi.string().required(),
  //   },
  // }),
  tasksController.create,
);

tasksRouter.post('/create-all', tasksController.createAll);

// tasksRouter.post('/import', upload.single('file'), tasksController.import);

// tasksRouter.put('/', tasksController.update);

export default tasksRouter;
