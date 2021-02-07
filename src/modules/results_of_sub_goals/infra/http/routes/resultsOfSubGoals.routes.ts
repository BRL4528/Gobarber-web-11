import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';
// import multer from 'multer';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// import uploadConfig from '@config/upload';
import ResultsOfSubGoalsController from '../controllers/ResultsOfSubGoalsController';

const resultsOfSubGoalsController = new ResultsOfSubGoalsController();

const resultsOfSubGoalsRouter = Router();
// const upload = multer(uploadConfig);

resultsOfSubGoalsRouter.get('/', resultsOfSubGoalsController.index);

resultsOfSubGoalsRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),
  //     status: Joi.string().required(),
  //     weight: Joi.string().required(),
  //   },
  // }),
  resultsOfSubGoalsController.create,
);

// resultsOfSubGoalsRouter.post(
//   '/import',
//   upload.single('file'),
//   resultsOfSubGoalsController.import,
// );

resultsOfSubGoalsRouter.post(
  '/create-all',
  resultsOfSubGoalsController.createAll,
);

// resultsOfSubGoalsRouter.put('/', resultsOfSubGoalsController.update);

export default resultsOfSubGoalsRouter;
