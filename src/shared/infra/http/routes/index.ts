import { Router } from 'express';
// import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
// import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
// import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/accesses/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/accesses/infra/http/routes/password.routes';
import accessesRouter from '@modules/accesses/infra/http/routes/accesses.routes';
import sectorsRouter from '@modules/sectors/infra/http/routes/sectors.routes';

const routes = Router();

// routes.use('/appointments', appointmentsRouter);
// routes.use('/providers', providersRouter);
// routes.use('/users', usersRouter);
routes.use('/accesses', accessesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/sectors', sectorsRouter);

export default routes;
