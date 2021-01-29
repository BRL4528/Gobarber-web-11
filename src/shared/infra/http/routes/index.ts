import { Router } from 'express';
// import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import sessionsRouter from '@modules/accesses/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/accesses/infra/http/routes/password.routes';
import accessesRouter from '@modules/accesses/infra/http/routes/accesses.routes';
import sectorsRouter from '@modules/sectors/infra/http/routes/sectors.routes';
import goalsRouter from '@modules/goals/infra/http/routes/goals.routes';
import subGoalsRouter from '@modules/sub_goals/infra/http/routes/subGoals.routes';
import subGoalsOfGoalsRouter from '@modules/sub_goals_of_goals/infra/http/routes/subGoalsOfGoals.routes';
import goalsOfSectorsRouter from '@modules/goals_of_sectors/infra/http/routes/GoalsOfSectors.routes';
import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import generateTokenBIRouter from '@modules/generate_token_bi/infra/http/routes/generate_token_bi.routes';
import analysisModuleRouter from '@modules/analysis_module/infra/http/routes/analysisModule.routes';
import analysisModuleOfGoalsRouter from '@modules/analysis_module_of_goals/infra/http/routes/analysisModuleOfGoals.routes';

const routes = Router();

// routes.use('/appointments', appointmentsRouter);
routes.use('/accesses', accessesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/sectors', sectorsRouter);
routes.use('/goals', goalsRouter);
routes.use('/sub-goals', subGoalsRouter);
routes.use('/sub-goals-of-goals', subGoalsOfGoalsRouter);
routes.use('/goals-of-sectors', goalsOfSectorsRouter);
routes.use('/employees', employeesRouter);
routes.use('/getEmbedToken', generateTokenBIRouter);
routes.use('/analysis-module', analysisModuleRouter);
routes.use('/analysis-module-of-goals', analysisModuleOfGoalsRouter);

export default routes;
