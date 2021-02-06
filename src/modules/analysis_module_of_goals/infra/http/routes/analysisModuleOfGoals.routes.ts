import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import AnalysisModuleOfGoalsController from '../controllers/AnalysisModuleOfGoalsController';

const analysisModuleOfGoalsController = new AnalysisModuleOfGoalsController();

const analysisModuleOfGoalsRouter = Router();

analysisModuleOfGoalsRouter.get('/', analysisModuleOfGoalsController.show);

analysisModuleOfGoalsRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),
  //     status: Joi.string().required(),
  //     weight: Joi.string().required(),
  //     goals: Joi.array(),
  //   },
  // }),
  analysisModuleOfGoalsController.create,
);

// analysisModuleOfGoalsRouter.put('/', analysisModuleOfGoalsController.update);

export default analysisModuleOfGoalsRouter;
