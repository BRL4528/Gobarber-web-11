import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';
// import multer from 'multer';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// import uploadConfig from '@config/upload';
import AnalysisModuleController from '../controllers/AnalysisModuleController';

const analysisModuleController = new AnalysisModuleController();

const analysisModuleRouter = Router();
// const upload = multer(uploadConfig);

analysisModuleRouter.get('/', analysisModuleController.index);

analysisModuleRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),
  //     status: Joi.string().required(),
  //     weight: Joi.string().required(),
  //     goals: Joi.array(),
  //   },
  // }),
  analysisModuleController.create,
);

// analysisModuleRouter.post(
//   '/import',
//   upload.single('file'),
//   analysisModuleController.import,
// );

analysisModuleRouter.put('/', analysisModuleController.update);

export default analysisModuleRouter;
