import { Router } from 'express';
// import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
// import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import sessionsRouter from '@modules/accesses/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/accesses/infra/http/routes/password.routes';
import accessesRouter from '@modules/accesses/infra/http/routes/accesses.routes';
import sectorsRouter from '@modules/sectors/infra/http/routes/sectors.routes';
import goalsRouter from '@modules/goals/infra/http/routes/goals.routes';

const routes = Router();

// routes.use('/appointments', appointmentsRouter);
// routes.use('/providers', providersRouter);
routes.use('/accesses', accessesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/sectors', sectorsRouter);
routes.use('/goals', goalsRouter);

export default routes;
