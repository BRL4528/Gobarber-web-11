import { Router } from 'express';
// import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '@modules/accesses/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/accesses/infra/http/routes/password.routes';
import accessesRouter from '@modules/accesses/infra/http/routes/accesses.routes';
import sectorsRouter from '@modules/sectors/infra/http/routes/sectors.routes';
import goalsRouter from '@modules/goals/infra/http/routes/goals.routes';
import subGoalsRouter from '@modules/sub_goals/infra/http/routes/subGoals.routes';

const routes = Router();

// routes.use('/appointments', appointmentsRouter);
routes.use('/accesses', accessesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/sectors', sectorsRouter);
routes.use('/goals', goalsRouter);
routes.use('/sub-goals', subGoalsRouter);

export default routes;
