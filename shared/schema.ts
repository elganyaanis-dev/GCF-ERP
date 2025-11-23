import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Organizational Structure - Direction Générale (HQ)
export const directions = pgTable("directions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  location: varchar("location").notNull(),
  email: varchar("email"),
  directorId: varchar("director_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Central Directions at HQ Level (DG)
export const centralDirections = pgTable("central_directions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // Marché, Réalisation, RH, Matériels, Études
  type: varchar("type").notNull(), // market, realization, hr, materials, studies
  email: varchar("email"),
  directorId: varchar("director_id").references(() => users.id),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Organizational Structure - Pôles Opérationnels
export const poles = pgTable("poles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  region: varchar("region").notNull(), // Extrême Est, Centre, Ouest, Sud
  location: varchar("location").notNull(),
  directorId: varchar("director_id").references(() => users.id),
  directionId: varchar("direction_id").references(() => directions.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Services within Poles
export const poleServices = pgTable("pole_services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poleId: varchar("pole_id").references(() => poles.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(), // Soutien, Réalisation, Achats, Études
  type: varchar("type").notNull(), // support, realization, procurement, studies, projects
  email: varchar("email"),
  managerUserId: varchar("manager_user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Organizational Structure - Units/Unités
export const units = pgTable("units", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  city: varchar("city").notNull(),
  managerId: varchar("manager_id").references(() => users.id),
  poleId: varchar("pole_id").references(() => poles.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  dateOfBirth: date("date_of_birth"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user"), // admin, manager, director, user, supreme_admin
  accreditationLevel: varchar("accreditation_level").default("0"), // 0: User, 1: Supervisor, 2: Manager, 3: Director, 4: Admin, 5: Supreme Admin
  unitId: varchar("unit_id").references(() => units.id),
  poleServiceId: varchar("pole_service_id").references(() => poleServices.id),
  isPreRegistered: boolean("is_pre_registered").default(false), // Employee pre-registered in system
  isSupremeAdmin: boolean("is_supreme_admin").default(false), // Supreme admin with direct project modification
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Employees table
export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull().unique(),
  phone: varchar("phone"),
  dateOfBirth: date("date_of_birth"),
  position: varchar("position").notNull(),
  department: varchar("department").notNull(),
  unitId: varchar("unit_id").references(() => units.id),
  poleServiceId: varchar("pole_service_id").references(() => poleServices.id),
  supervisorId: varchar("supervisor_id").references(() => employees.id),
  hireDate: date("hire_date").notNull(),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  salaryGridId: varchar("salary_grid_id").references(() => salaryGrids.id),
  status: varchar("status").default("active"), // active, inactive, on_leave
  address: text("address"),
  city: varchar("city"),
  country: varchar("country"),
  profileImage: varchar("profile_image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;

// Projects table with project types
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  projectTypeId: varchar("project_type_id").references(() => projectTypes.id),
  status: varchar("status").default("planning"), // planning, in_progress, on_hold, completed, cancelled
  priority: varchar("priority").default("medium"), // low, medium, high, urgent
  budget: decimal("budget", { precision: 12, scale: 2 }),
  spent: decimal("spent", { precision: 12, scale: 2 }).default("0"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  managerId: varchar("manager_id").references(() => employees.id),
  clientName: varchar("client_name"),
  partnerId: varchar("partner_id").references(() => partners.id),
  progress: integer("progress").default(0), // 0-100
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  spent: true,
  progress: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Project Types
export const projectTypes = pgTable("project_types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // Public Market, Direct Contract, Subcontracting
  description: text("description"),
  code: varchar("code").unique().notNull(), // public_market, direct_contract, subcontracting
  createdAt: timestamp("created_at").defaultNow(),
});

export type ProjectType = typeof projectTypes.$inferSelect;

// Partners, Suppliers, Subcontractors
export const partners = pgTable("partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // partner, supplier, subcontractor
  email: varchar("email"),
  phone: varchar("phone"),
  address: text("address"),
  city: varchar("city"),
  country: varchar("country"),
  taxId: varchar("tax_id"),
  bankDetails: text("bank_details"),
  contactPerson: varchar("contact_person"),
  status: varchar("status").default("active"), // active, inactive, suspended
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPartnerSchema = createInsertSchema(partners).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partners.$inferSelect;

// Tasks table (for Gantt chart)
export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  status: varchar("status").default("pending"), // pending, in_progress, completed
  assigneeId: varchar("assignee_id").references(() => employees.id),
  startDate: date("start_date"),
  endDate: date("end_date"),
  duration: integer("duration"), // in days
  dependencies: text("dependencies"), // comma-separated task IDs
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

// Documents table
export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  type: varchar("type").notNull(), // contract, invoice, report, policy, other
  fileUrl: varchar("file_url").notNull(),
  fileSize: integer("file_size"), // in bytes
  mimeType: varchar("mime_type"),
  version: integer("version").default(1),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: 'cascade' }),
  tags: text("tags"), // comma-separated
  isArchived: boolean("is_archived").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  version: true,
});

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

// Leaves (Congés) table
export const leaves = pgTable("leaves", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  type: varchar("type").notNull(), // annual, sick, maternity, unpaid
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  days: integer("days").notNull(),
  status: varchar("status").default("pending"), // pending, approved, rejected
  reason: text("reason"),
  approvedBy: varchar("approved_by").references(() => users.id),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLeaveSchema = createInsertSchema(leaves).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  approvedAt: true,
});

export type InsertLeave = z.infer<typeof insertLeaveSchema>;
export type Leave = typeof leaves.$inferSelect;

// Salary Grids
export const salaryGrids = pgTable("salary_grids", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // Level A, Level B, etc.
  minSalary: decimal("min_salary", { precision: 10, scale: 2 }).notNull(),
  maxSalary: decimal("max_salary", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type SalaryGrid = typeof salaryGrids.$inferSelect;

// Allowances (Indemnités)
export const allowances = pgTable("allowances", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // Housing, Meal, Transportation, etc.
  type: varchar("type").notNull(), // fixed, percentage
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Allowance = typeof allowances.$inferSelect;

// Bonuses (Primes)
export const bonuses = pgTable("bonuses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(), // Performance, Holiday, Annual, etc.
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Bonus = typeof bonuses.$inferSelect;

// Travel Expenses (Frais de déplacement)
export const travelExpenses = pgTable("travel_expenses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  missionOrderId: varchar("mission_order_id").references(() => missionOrders.id, { onDelete: 'cascade' }),
  employeeId: varchar("employee_id").references(() => employees.id).notNull(),
  type: varchar("type").notNull(), // transport, accommodation, meals, other
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").default("DZD"),
  description: text("description"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type TravelExpense = typeof travelExpenses.$inferSelect;

// Payroll table (extended)
export const payroll = pgTable("payroll", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  month: integer("month").notNull(), // 1-12
  year: integer("year").notNull(),
  country: varchar("country").default("Algeria"), // Support multiple countries
  baseSalary: decimal("base_salary", { precision: 10, scale: 2 }).notNull(),
  allowances: decimal("allowances", { precision: 10, scale: 2 }).default("0"),
  bonus: decimal("bonus", { precision: 10, scale: 2 }).default("0"),
  travelExpenses: decimal("travel_expenses", { precision: 10, scale: 2 }).default("0"),
  deductions: decimal("deductions", { precision: 10, scale: 2 }).default("0"),
  socialContributions: decimal("social_contributions", { precision: 10, scale: 2 }).default("0"),
  netSalary: decimal("net_salary", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status").default("draft"), // draft, validated, paid
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPayrollSchema = createInsertSchema(payroll).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPayroll = z.infer<typeof insertPayrollSchema>;
export type Payroll = typeof payroll.$inferSelect;

// Social Benefits (Bénéfices sociaux)
export const socialBenefits = pgTable("social_benefits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // Health insurance, Retirement, Life insurance, etc.
  description: text("description"),
  costByPosition: jsonb("cost_by_position"), // JSON: {"position1": 100, "position2": 150}
  applicableToAll: boolean("applicable_to_all").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type SocialBenefit = typeof socialBenefits.$inferSelect;

// Employee Donations (Dons pour les causes)
export const employeeDonations = pgTable("employee_donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  purpose: varchar("purpose").notNull(), // religious_holiday, employee_hardship, other
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  date: date("date").notNull(),
  approvedBy: varchar("approved_by").references(() => users.id),
  status: varchar("status").default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export type EmployeeDonation = typeof employeeDonations.$inferSelect;

// Employee Loans (Prêts aux employés)
export const employeeLoans = pgTable("employee_loans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  purpose: varchar("purpose").notNull(),
  approvalDate: date("approval_date"),
  approvedBy: varchar("approved_by").references(() => users.id),
  repaymentMonths: integer("repayment_months"),
  monthlyRepayment: decimal("monthly_repayment", { precision: 10, scale: 2 }),
  interestRate: decimal("interest_rate", { precision: 5, scale: 2 }).default("0"),
  status: varchar("status").default("pending"), // pending, approved, active, completed
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type EmployeeLoan = typeof employeeLoans.$inferSelect;

// Service Customizations (Configuration par service)
export const serviceCustomizations = pgTable("service_customizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poleServiceId: varchar("pole_service_id").references(() => poleServices.id, { onDelete: 'cascade' }).notNull(),
  key: varchar("key").notNull(), // Feature flags or settings
  value: text("value"), // JSON or simple value
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type ServiceCustomization = typeof serviceCustomizations.$inferSelect;

// Formations table
export const formations = pgTable("formations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  category: varchar("category").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  instructorId: varchar("instructor_id").references(() => employees.id),
  capacity: integer("capacity").default(30),
  location: varchar("location"),
  status: varchar("status").default("scheduled"), // scheduled, in_progress, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFormationSchema = createInsertSchema(formations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertFormation = z.infer<typeof insertFormationSchema>;
export type Formation = typeof formations.$inferSelect;

// Notifications table
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  type: varchar("type").default("info"), // info, warning, error, success
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

// MESSAGING - Conversations table
export const conversations = pgTable("conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name"),
  type: varchar("type").default("direct"), // direct, group
  createdBy: varchar("created_by").references(() => users.id).notNull(),
  lastMessageAt: timestamp("last_message_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  lastMessageAt: true,
});

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

// Messages table
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conversationId: varchar("conversation_id").references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
  senderId: varchar("sender_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  attachments: text("attachments"), // JSON array of file URLs
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
  isRead: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Conversation Participants
export const conversationParticipants = pgTable("conversation_participants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conversationId: varchar("conversation_id").references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// ORDRES DE MISSION - Mission Orders table
export const missionOrders = pgTable("mission_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: varchar("order_number").unique().notNull(),
  employeeId: varchar("employee_id").references(() => employees.id).notNull(),
  projectId: varchar("project_id").references(() => projects.id),
  destination: varchar("destination").notNull(),
  purpose: text("purpose").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  duration: integer("duration").notNull(), // in days
  transportMode: varchar("transport_mode"), // vehicle, flight, train, other
  estimatedBudget: decimal("estimated_budget", { precision: 10, scale: 2 }),
  status: varchar("status").default("draft"), // draft, pending_approval, approved, in_progress, completed, cancelled
  approvedBy: varchar("approved_by").references(() => users.id),
  approvedAt: timestamp("approved_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMissionOrderSchema = createInsertSchema(missionOrders).omit({
  id: true,
  orderNumber: true,
  createdAt: true,
  updatedAt: true,
  approvedAt: true,
});

export type InsertMissionOrder = z.infer<typeof insertMissionOrderSchema>;
export type MissionOrder = typeof missionOrders.$inferSelect;

// DÉPLACEMENTS - Travel/Displacement Requests table
export const travels = pgTable("travels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  missionOrderId: varchar("mission_order_id").references(() => missionOrders.id, { onDelete: 'cascade' }),
  employeeId: varchar("employee_id").references(() => employees.id).notNull(),
  departureDate: date("departure_date").notNull(),
  returnDate: date("return_date").notNull(),
  origin: varchar("origin").notNull(),
  destination: varchar("destination").notNull(),
  transportMode: varchar("transport_mode").notNull(), // car, flight, train, bus
  distance: integer("distance"), // in km
  estimatedCost: decimal("estimated_cost", { precision: 10, scale: 2 }),
  actualCost: decimal("actual_cost", { precision: 10, scale: 2 }),
  status: varchar("status").default("pending"), // pending, approved, in_transit, completed, cancelled
  approvedBy: varchar("approved_by").references(() => users.id),
  approvedAt: timestamp("approved_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTravelSchema = createInsertSchema(travels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  approvedAt: true,
});

export type InsertTravel = z.infer<typeof insertTravelSchema>;
export type Travel = typeof travels.$inferSelect;

// Audit Logs table
export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  action: varchar("action").notNull(),
  entityType: varchar("entity_type").notNull(),
  entityId: varchar("entity_id").notNull(),
  changes: jsonb("changes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type AuditLog = typeof auditLogs.$inferSelect;

// ERP Communications - Direct messages from admins to system
export const erpCommunications = pgTable("erp_communications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  subject: varchar("subject").notNull(),
  message: text("message").notNull(),
  type: varchar("type").notNull(), // feedback, modification, bug, feature, urgent
  response: text("response"),
  respondedAt: timestamp("responded_at"),
  status: varchar("status").default("new"), // new, read, responded, closed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertERPCommunicationSchema = createInsertSchema(erpCommunications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  response: true,
  respondedAt: true,
  status: true,
});

export type InsertERPCommunication = z.infer<typeof insertERPCommunicationSchema>;
export type ERPCommunication = typeof erpCommunications.$inferSelect;
