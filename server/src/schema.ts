import { z } from 'zod';

// Company Profile schemas
export const companyInfoSchema = z.object({
  id: z.number(),
  company_name: z.string(),
  description: z.string().nullable(),
  mission: z.string().nullable(),
  vision: z.string().nullable(),
  founded_year: z.number().int().nullable(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().email().nullable(),
  website: z.string().url().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type CompanyInfo = z.infer<typeof companyInfoSchema>;

export const serviceSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  is_active: z.boolean(),
  display_order: z.number().int(),
  created_at: z.coerce.date()
});

export type Service = z.infer<typeof serviceSchema>;

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image_url: z.string().url().nullable(),
  project_url: z.string().url().nullable(),
  category: z.string().nullable(),
  is_featured: z.boolean(),
  display_order: z.number().int(),
  created_at: z.coerce.date()
});

export type Project = z.infer<typeof projectSchema>;

// User authentication schemas
export const userRoleEnum = z.enum(['HRD_ADMIN', 'EMPLOYEE']);

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password_hash: z.string(),
  role: userRoleEnum,
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

// Employee data schemas
export const employeeStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'TERMINATED']);

export const employeeSchema = z.object({
  id: z.number(),
  employee_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  department: z.string().nullable(),
  position: z.string().nullable(),
  hire_date: z.coerce.date().nullable(),
  salary: z.number().nullable(),
  status: employeeStatusEnum,
  manager_id: z.number().nullable(),
  created_by: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Employee = z.infer<typeof employeeSchema>;

// Input schemas for creating/updating
export const createServiceInputSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  is_active: z.boolean().default(true),
  display_order: z.number().int().default(0)
});

export type CreateServiceInput = z.infer<typeof createServiceInputSchema>;

export const updateServiceInputSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
  display_order: z.number().int().optional()
});

export type UpdateServiceInput = z.infer<typeof updateServiceInputSchema>;

export const createProjectInputSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  image_url: z.string().url().nullable(),
  project_url: z.string().url().nullable(),
  category: z.string().nullable(),
  is_featured: z.boolean().default(false),
  display_order: z.number().int().default(0)
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

export const updateProjectInputSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  project_url: z.string().url().nullable().optional(),
  category: z.string().nullable().optional(),
  is_featured: z.boolean().optional(),
  display_order: z.number().int().optional()
});

export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;

export const createEmployeeInputSchema = z.object({
  employee_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  department: z.string().nullable(),
  position: z.string().nullable(),
  hire_date: z.coerce.date().nullable(),
  salary: z.number().positive().nullable(),
  status: employeeStatusEnum.default('ACTIVE'),
  manager_id: z.number().nullable(),
  created_by: z.number()
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeInputSchema>;

export const updateEmployeeInputSchema = z.object({
  id: z.number(),
  employee_id: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  hire_date: z.coerce.date().nullable().optional(),
  salary: z.number().positive().nullable().optional(),
  status: employeeStatusEnum.optional(),
  manager_id: z.number().nullable().optional()
});

export type UpdateEmployeeInput = z.infer<typeof updateEmployeeInputSchema>;

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string()
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

export const updateCompanyInfoInputSchema = z.object({
  company_name: z.string().optional(),
  description: z.string().nullable().optional(),
  mission: z.string().nullable().optional(),
  vision: z.string().nullable().optional(),
  founded_year: z.number().int().nullable().optional(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  website: z.string().url().nullable().optional()
});

export type UpdateCompanyInfoInput = z.infer<typeof updateCompanyInfoInputSchema>;