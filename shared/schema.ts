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

// ============ GROUP & SUBSIDIARIES STRUCTURE ============
// Groupe GCF (parent company)
export const subsidiaries = pgTable("subsidiaries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // Infrarail, Citrail, RailElectr, Infrafer
  code: varchar("code").unique().notNull(), // infrarail, citrail, rail-elctr, infrafer
  type: varchar("type").notNull(), // subsidiary, main
  location: varchar("location"),
  email: varchar("email"),
  phone: varchar("phone"),
  ceoUserId: varchar("ceo_user_id").references(() => users.id),
  dgUserId: varchar("dg_user_id").references(() => users.id), // Director General (DG)
  companyRegistration: varchar("company_registration"),
  taxId: varchar("tax_id"),
  logo: varchar("logo"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Subsidiary = typeof subsidiaries.$inferSelect;

// Company Settings (HQ level - GCF)
export const companySettings = pgTable("company_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
  category: varchar("category"), // group, compliance, branding, email
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id),
  updatedBy: varchar("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type CompanySetting = typeof companySettings.$inferSelect;

// ============ ORGANIZATIONAL STRUCTURE ============
// Directions at HQ Level (DG functions)
export const directions = pgTable("directions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  location: varchar("location").notNull(),
  email: varchar("email"),
  directorId: varchar("director_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Central Directions at HQ Level
export const centralDirections = pgTable("central_directions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id),
  name: varchar("name").notNull(), // Marché, Réalisation, RH, Matériels, Études
  type: varchar("type").notNull(), // market, realization, hr, materials, studies
  email: varchar("email"),
  directorId: varchar("director_id").references(() => users.id),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Operational Poles (Pôles Opérationnels)
export const poles = pgTable("poles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(),
  code: varchar("code"),
  region: varchar("region"), // Extrême Est, Centre, Ouest, Sud
  location: varchar("location"),
  directorId: varchar("director_id").references(() => users.id),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Services within Poles
export const poleServices = pgTable("pole_services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poleId: varchar("pole_id").references(() => poles.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(), // Soutien, Réalisation, Achats, Études
  code: varchar("code"),
  type: varchar("type"), // support, realization, procurement, studies
  email: varchar("email"),
  managerUserId: varchar("manager_user_id").references(() => users.id),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Organizational Units (Unités)
export const units = pgTable("units", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id).notNull(),
  poleServiceId: varchar("pole_service_id").references(() => poleServices.id),
  name: varchar("name").notNull(),
  code: varchar("code"),
  city: varchar("city"),
  type: varchar("type"), // study, wilaya, service
  managerId: varchar("manager_id").references(() => users.id),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============ USERS & AUTHENTICATION ============
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  dateOfBirth: date("date_of_birth"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user"), // admin, manager, director, user, ceo, dg
  accreditationLevel: varchar("accreditation_level").default("0"), // 0-4 + 5 supreme
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id),
  unitId: varchar("unit_id").references(() => units.id),
  poleServiceId: varchar("pole_service_id").references(() => poleServices.id),
  isPreRegistered: boolean("is_pre_registered").default(false),
  isSupremeAdmin: boolean("is_supreme_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// ============ EMPLOYEES ============
export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
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
  contractType: varchar("contract_type"), // cdi, cdd, stage
  status: varchar("status").default("active"), // active, inactive, on_leave
  salaryGridId: varchar("salary_grid_id").references(() => salaryGrids.id),
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

// ============ PROJECTS & TASKS ============
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  typeId: varchar("type_id").references(() => projectTypes.id),
  status: varchar("status").default("planning"), // planning, in_progress, paused, completed, cancelled
  budget: decimal("budget", { precision: 15, scale: 2 }),
  startDate: date("start_date"),
  endDate: date("end_date"),
  managerId: varchar("manager_id").references(() => employees.id),
  poleId: varchar("pole_id").references(() => poles.id),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Project Types
export const projectTypes = pgTable("project_types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // Public Market, Direct Contract, Subcontracting
  description: text("description"),
  code: varchar("code").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ProjectType = typeof projectTypes.$inferSelect;

// Tasks (Gantt Chart support)
export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  status: varchar("status").default("pending"), // pending, in_progress, completed
  assigneeId: varchar("assignee_id").references(() => employees.id),
  startDate: date("start_date"),
  endDate: date("end_date"),
  duration: integer("duration"),
  dependencies: text("dependencies"),
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

// ============ BUDGET & FINANCIAL ============
export const budgets = pgTable("budgets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: 'cascade' }),
  year: varchar("year").notNull(),
  category: varchar("category").notNull(), // operational, capital, projects, hr
  allocated: decimal("allocated", { precision: 15, scale: 2 }).notNull(),
  spent: decimal("spent", { precision: 15, scale: 2 }).default('0'),
  status: varchar("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Budget = typeof budgets.$inferSelect;

// Financial Transactions
export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  type: varchar("type").notNull(), // expense, revenue, adjustment
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  category: varchar("category").notNull(),
  description: text("description"),
  date: date("date").notNull(),
  reference: varchar("reference"),
  budgetId: varchar("budget_id").references(() => budgets.id),
  approvedBy: varchar("approved_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Transaction = typeof transactions.$inferSelect;

// ============ ASSETS & LOGISTICS ============
export const assets = pgTable("assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // vehicle, equipment, machinery, building, other
  serialNumber: varchar("serial_number"),
  acquisitionDate: date("acquisition_date"),
  acquisitionCost: decimal("acquisition_cost", { precision: 12, scale: 2 }),
  currentValue: decimal("current_value", { precision: 12, scale: 2 }),
  status: varchar("status").default("active"), // active, maintenance, retired
  location: varchar("location"),
  assignedTo: varchar("assigned_to").references(() => employees.id),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Asset = typeof assets.$inferSelect;

// Vehicle & Logistics Management (important for RailElectr)
export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetId: varchar("asset_id").references(() => assets.id, { onDelete: 'cascade' }).notNull(),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  licensePlate: varchar("license_plate").unique().notNull(),
  vehicleType: varchar("vehicle_type").notNull(), // truck, bus, locomotive, wagon, car
  manufacturer: varchar("manufacturer"),
  model: varchar("model"),
  year: integer("year"),
  engineNumber: varchar("engine_number"),
  fuelType: varchar("fuel_type"), // diesel, electric, hybrid
  capacity: integer("capacity"), // tonnage or passenger count
  maintenanceSchedule: text("maintenance_schedule"),
  lastServiceDate: date("last_service_date"),
  nextServiceDate: date("next_service_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Vehicle = typeof vehicles.$inferSelect;

// ============ PARTNERS & SUPPLIERS ============
export const partners = pgTable("partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
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
  status: varchar("status").default("active"),
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

// ============ DOCUMENTS ============
export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  type: varchar("type").notNull(), // contract, invoice, report, policy, regulation
  fileUrl: varchar("file_url").notNull(),
  fileSize: integer("file_size"),
  mimeType: varchar("mime_type"),
  version: integer("version").default(1),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  projectId: varchar("project_id").references(() => projects.id, { onDelete: 'cascade' }),
  tags: text("tags"),
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

// ============ HR & PAYROLL ============
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
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(),
  minSalary: decimal("min_salary", { precision: 10, scale: 2 }).notNull(),
  maxSalary: decimal("max_salary", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type SalaryGrid = typeof salaryGrids.$inferSelect;

// Allowances
export const allowances = pgTable("allowances", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(), // Housing, Meal, Transportation
  type: varchar("type").notNull(), // fixed, percentage
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Allowance = typeof allowances.$inferSelect;

// Bonuses
export const bonuses = pgTable("bonuses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  reason: varchar("reason"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Bonus = typeof bonuses.$inferSelect;

// Payroll
export const payroll = pgTable("payroll", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  month: varchar("month").notNull(), // YYYY-MM
  baseSalary: decimal("base_salary", { precision: 10, scale: 2 }).notNull(),
  allowancesTotal: decimal("allowances_total", { precision: 10, scale: 2 }).default('0'),
  bonusesTotal: decimal("bonuses_total", { precision: 10, scale: 2 }).default('0'),
  deductionsTotal: decimal("deductions_total", { precision: 10, scale: 2 }).default('0'),
  netSalary: decimal("net_salary", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status").default("draft"), // draft, submitted, approved, paid
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPayrollSchema = createInsertSchema(payroll).omit({
  id: true,
  createdAt: true,
});

export type InsertPayroll = z.infer<typeof insertPayrollSchema>;
export type Payroll = typeof payroll.$inferSelect;

// ============ TRAINING & FORMATION ============
export const formations = pgTable("formations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  provider: varchar("provider"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  maxParticipants: integer("max_participants"),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  status: varchar("status").default("scheduled"), // scheduled, ongoing, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFormationSchema = createInsertSchema(formations).omit({
  id: true,
  createdAt: true,
});

export type InsertFormation = z.infer<typeof insertFormationSchema>;
export type Formation = typeof formations.$inferSelect;

// Formation Enrollments
export const formationEnrollments = pgTable("formation_enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  formationId: varchar("formation_id").references(() => formations.id, { onDelete: 'cascade' }).notNull(),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  status: varchar("status").default("enrolled"), // enrolled, completed, dropped
  score: integer("score"),
  certificate: varchar("certificate"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

export type FormationEnrollment = typeof formationEnrollments.$inferSelect;

// ============ MISSION & TRAVEL ============
export const missionOrders = pgTable("mission_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  destination: varchar("destination").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  purpose: text("purpose"),
  budget: decimal("budget", { precision: 10, scale: 2 }),
  status: varchar("status").default("pending"),
  approvedBy: varchar("approved_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMissionOrderSchema = createInsertSchema(missionOrders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMissionOrder = z.infer<typeof insertMissionOrderSchema>;
export type MissionOrder = typeof missionOrders.$inferSelect;

// Travel Expenses
export const travels = pgTable("travels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  employeeId: varchar("employee_id").references(() => employees.id, { onDelete: 'cascade' }).notNull(),
  missionOrderId: varchar("mission_order_id").references(() => missionOrders.id),
  type: varchar("type").notNull(), // transport, accommodation, meals, other
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  date: date("date"),
  description: text("description"),
  receipt: varchar("receipt"),
  status: varchar("status").default("submitted"),
  approvedBy: varchar("approved_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTravelSchema = createInsertSchema(travels).omit({
  id: true,
  createdAt: true,
});

export type InsertTravel = z.infer<typeof insertTravelSchema>;
export type Travel = typeof travels.$inferSelect;

// ============ COMPLIANCE & REGULATIONS ============
export const complianceItems = pgTable("compliance_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  type: varchar("type").notNull(), // regulation, policy, procedure, audit
  ministry: varchar("ministry"), // travaux-publics, environnement, travail
  dueDate: date("due_date"),
  status: varchar("status").default("active"), // active, completed, expired
  documentId: varchar("document_id").references(() => documents.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ComplianceItem = typeof complianceItems.$inferSelect;

// ============ COMMUNICATIONS ============
export const conversations = pgTable("conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id, { onDelete: 'cascade' }).notNull(),
  participantIds: text("participant_ids"),
  isGroup: boolean("is_group").default(false),
  groupName: varchar("group_name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

// Messages
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conversationId: varchar("conversation_id").references(() => conversations.id, { onDelete: 'cascade' }).notNull(),
  senderId: varchar("sender_id").references(() => users.id),
  content: text("content"),
  attachments: text("attachments"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// ============ NOTIFICATIONS ============
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: varchar("type").notNull(), // email, system, alert
  title: varchar("title").notNull(),
  content: text("content"),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

// ============ ERP FEEDBACK & IMPROVEMENTS ============
export const erpCommunications = pgTable("erp_communications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  subsidiaryId: varchar("subsidiary_id").references(() => subsidiaries.id),
  type: varchar("type").notNull(), // feedback, bug_report, feature_request, improvement
  title: varchar("title").notNull(),
  description: text("description"),
  priority: varchar("priority"), // low, medium, high, critical
  status: varchar("status").default("open"),
  attachments: text("attachments"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type ErpCommunication = typeof erpCommunications.$inferSelect;
