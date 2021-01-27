import { Router } from 'express';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import GenerateTokenBIController from '../controllers/GenerateTokenBIController';

const generateTokenBIController = new GenerateTokenBIController();

const generateTokenBIsRouter = Router();

generateTokenBIsRouter.get('/', generateTokenBIController.index);

export default generateTokenBIsRouter;
