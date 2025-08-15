import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  createServiceInputSchema, 
  updateServiceInputSchema,
  createProjectInputSchema,
  updateProjectInputSchema,
  createEmployeeInputSchema,
  updateEmployeeInputSchema,
  loginInputSchema,
  updateCompanyInfoInputSchema
} from './schema';

// Import handlers - Company Profile
import { getCompanyInfo } from './handlers/get_company_info';
import { updateCompanyInfo } from './handlers/update_company_info';
import { getServices } from './handlers/get_services';
import { createService } from './handlers/create_service';
import { updateService } from './handlers/update_service';
import { getProjects, getFeaturedProjects } from './handlers/get_projects';
import { createProject } from './handlers/create_project';
import { updateProject } from './handlers/update_project';

// Import handlers - Authentication
import { login } from './handlers/login';
import { getCurrentUser } from './handlers/get_current_user';

// Import handlers - Employee Management
import { getEmployees, getEmployeeById } from './handlers/get_employees';
import { createEmployee } from './handlers/create_employee';
import { updateEmployee } from './handlers/update_employee';
import { deleteEmployee } from './handlers/delete_employee';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Public Company Profile routes
  getCompanyInfo: publicProcedure
    .query(() => getCompanyInfo()),
  
  getServices: publicProcedure
    .query(() => getServices()),
  
  getProjects: publicProcedure
    .query(() => getProjects()),
  
  getFeaturedProjects: publicProcedure
    .query(() => getFeaturedProjects()),

  // Authentication routes
  login: publicProcedure
    .input(loginInputSchema)
    .mutation(({ input }) => login(input)),
  
  getCurrentUser: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ input }) => getCurrentUser(input.userId)),

  // Admin/HRD routes for company profile management
  updateCompanyInfo: publicProcedure
    .input(updateCompanyInfoInputSchema)
    .mutation(({ input }) => updateCompanyInfo(input)),
  
  createService: publicProcedure
    .input(createServiceInputSchema)
    .mutation(({ input }) => createService(input)),
  
  updateService: publicProcedure
    .input(updateServiceInputSchema)
    .mutation(({ input }) => updateService(input)),
  
  createProject: publicProcedure
    .input(createProjectInputSchema)
    .mutation(({ input }) => createProject(input)),
  
  updateProject: publicProcedure
    .input(updateProjectInputSchema)
    .mutation(({ input }) => updateProject(input)),

  // Employee management routes
  getEmployees: publicProcedure
    .query(() => getEmployees()),
  
  getEmployeeById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getEmployeeById(input.id)),
  
  createEmployee: publicProcedure
    .input(createEmployeeInputSchema)
    .mutation(({ input }) => createEmployee(input)),
  
  updateEmployee: publicProcedure
    .input(updateEmployeeInputSchema)
    .mutation(({ input }) => updateEmployee(input)),
  
  deleteEmployee: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteEmployee(input.id)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();