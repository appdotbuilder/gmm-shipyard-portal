import { serial, text, pgTable, timestamp, integer, boolean, pgEnum, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['HRD_ADMIN', 'EMPLOYEE']);
export const employeeStatusEnum = pgEnum('employee_status', ['ACTIVE', 'INACTIVE', 'TERMINATED']);

// Company Profile tables
export const companyInfoTable = pgTable('company_info', {
  id: serial('id').primaryKey(),
  company_name: text('company_name').notNull(),
  description: text('description'),
  mission: text('mission'),
  vision: text('vision'),
  founded_year: integer('founded_year'),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  website: text('website'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const servicesTable = pgTable('services', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  icon: text('icon'),
  is_active: boolean('is_active').notNull().default(true),
  display_order: integer('display_order').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  image_url: text('image_url'),
  project_url: text('project_url'),
  category: text('category'),
  is_featured: boolean('is_featured').notNull().default(false),
  display_order: integer('display_order').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// User authentication tables
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  role: userRoleEnum('role').notNull(),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Employee data tables
export const employeesTable = pgTable('employees', {
  id: serial('id').primaryKey(),
  employee_id: text('employee_id').notNull().unique(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  department: text('department'),
  position: text('position'),
  hire_date: timestamp('hire_date'),
  salary: numeric('salary', { precision: 10, scale: 2 }),
  status: employeeStatusEnum('status').notNull().default('ACTIVE'),
  manager_id: integer('manager_id'),
  created_by: integer('created_by').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const employeesRelations = relations(employeesTable, ({ one, many }) => ({
  manager: one(employeesTable, {
    fields: [employeesTable.manager_id],
    references: [employeesTable.id],
    relationName: 'manager_subordinate',
  }),
  subordinates: many(employeesTable, {
    relationName: 'manager_subordinate',
  }),
  createdBy: one(usersTable, {
    fields: [employeesTable.created_by],
    references: [usersTable.id],
  }),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  createdEmployees: many(employeesTable),
}));

// TypeScript types for the table schemas
export type CompanyInfo = typeof companyInfoTable.$inferSelect;
export type NewCompanyInfo = typeof companyInfoTable.$inferInsert;

export type Service = typeof servicesTable.$inferSelect;
export type NewService = typeof servicesTable.$inferInsert;

export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Employee = typeof employeesTable.$inferSelect;
export type NewEmployee = typeof employeesTable.$inferInsert;

// Export all tables for relation queries
export const tables = {
  companyInfo: companyInfoTable,
  services: servicesTable,
  projects: projectsTable,
  users: usersTable,
  employees: employeesTable,
};