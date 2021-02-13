import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import GoalsOfSectorsController from '../controllers/GoalsOfSectorsController';

const goalsOfSectorsController = new GoalsOfSectorsController();

const goalsOfSectorsRouter = Router();

goalsOfSectorsRouter.get('/', goalsOfSectorsController.show);

goalsOfSectorsRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     name: Joi.string().required(),
  //     status: Joi.string().required(),
  //     weight: Joi.string().required(),
  //     goals: Joi.array(),
  //   },
  // }),
  goalsOfSectorsController.create,
);

goalsOfSectorsRouter.put('/', goalsOfSectorsController.update);

goalsOfSectorsRouter.post('/create-all', goalsOfSectorsController.createAll);

export default goalsOfSectorsRouter;
