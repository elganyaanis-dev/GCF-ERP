import {
  users,
  employees,
  projects,
  documents,
  leaves,
  payroll,
  formations,
  notifications,
  auditLogs,
  messages,
  conversations,
  conversationParticipants,
  missionOrders,
  travels,
  directions,
  centralDirections,
  poles,
  poleServices,
  units,
  erpCommunications,
  partners,
  projectTypes,
  salaryGrids,
  allowances,
  bonuses,
  travelExpenses,
  socialBenefits,
  employeeDonations,
  employeeLoans,
  serviceCustomizations,
  companySettings,
  type CompanySetting,
  type User,
  type UpsertUser,
  type Employee,
  type InsertEmployee,
  type Project,
  type InsertProject,
  type Document,
  type InsertDocument,
  type Leave,
  type InsertLeave,
  type Payroll,
  type InsertPayroll,
  type Formation,
  type InsertFormation,
  type Notification,
  type InsertNotification,
  type AuditLog,
  type Message,
  type InsertMessage,
  type Conversation,
  type InsertConversation,
  type MissionOrder,
  type InsertMissionOrder,
  type Travel,
  type InsertTravel,
  type Partner,
  type InsertPartner,
  type ProjectType,
  type SalaryGrid,
  type Allowance,
  type Bonus,
  type TravelExpense,
  type SocialBenefit,
  type EmployeeDonation,
  type EmployeeLoan,
  type ServiceCustomization,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  checkPreRegistration(email: string, firstName?: string, lastName?: string): Promise<Employee | undefined>;

  // Employee operations
  getEmployees(): Promise<Employee[]>;
  getEmployee(id: string): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, employee: Partial<InsertEmployee>): Promise<Employee | undefined>;
  deleteEmployee(id: string): Promise<void>;

  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<void>;

  // Document operations
  getDocuments(): Promise<Document[]>;
  getDocument(id: string): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;

  // Leave operations
  getLeaves(): Promise<Leave[]>;
  createLeave(leave: InsertLeave): Promise<Leave>;
  updateLeaveStatus(id: string, status: string, approvedBy?: string): Promise<Leave | undefined>;

  // Payroll operations
  getPayrolls(): Promise<Payroll[]>;
  createPayroll(payrollData: InsertPayroll): Promise<Payroll>;

  // Formation operations
  getFormations(): Promise<Formation[]>;
  createFormation(formation: InsertFormation): Promise<Formation>;

  // Notification operations
  getNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;

  // Messaging operations
  getConversations(userId: string): Promise<Conversation[]>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getMessages(conversationId: string): Promise<Message[]>;
  sendMessage(message: InsertMessage): Promise<Message>;
  addParticipant(conversationId: string, userId: string): Promise<void>;

  // Mission Orders operations
  getMissionOrders(): Promise<MissionOrder[]>;
  createMissionOrder(order: InsertMissionOrder): Promise<MissionOrder>;
  updateMissionOrder(id: string, order: Partial<InsertMissionOrder>): Promise<MissionOrder | undefined>;

  // Travel operations
  getTravels(): Promise<Travel[]>;
  createTravel(travel: InsertTravel): Promise<Travel>;
  updateTravel(id: string, travel: Partial<InsertTravel>): Promise<Travel | undefined>;

  // Organizational operations
  getDirections(): Promise<any[]>;
  getPoles(): Promise<any[]>;
  getUnits(): Promise<any[]>;

  // Dashboard stats
  getDashboardStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Employee operations
  async getEmployees(): Promise<Employee[]> {
    return await db.select().from(employees).orderBy(desc(employees.createdAt));
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    const [employee] = await db.select().from(employees).where(eq(employees.id, id));
    return employee;
  }

  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    const [newEmployee] = await db
      .insert(employees)
      .values(employee)
      .returning();
    return newEmployee;
  }

  async updateEmployee(id: string, employeeData: Partial<InsertEmployee>): Promise<Employee | undefined> {
    const [updated] = await db
      .update(employees)
      .set({ ...employeeData, updatedAt: new Date() })
      .where(eq(employees.id, id))
      .returning();
    return updated;
  }

  async deleteEmployee(id: string): Promise<void> {
    await db.delete(employees).where(eq(employees.id, id));
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async updateProject(id: string, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db
      .update(projects)
      .set({ ...projectData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updated;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Document operations
  async getDocuments(): Promise<Document[]> {
    return await db.select().from(documents).orderBy(desc(documents.createdAt));
  }

  async getDocument(id: string): Promise<Document | undefined> {
    const [document] = await db.select().from(documents).where(eq(documents.id, id));
    return document;
  }

  async createDocument(document: InsertDocument): Promise<Document> {
    const [newDocument] = await db
      .insert(documents)
      .values(document)
      .returning();
    return newDocument;
  }

  // Leave operations
  async getLeaves(): Promise<Leave[]> {
    return await db.select().from(leaves).orderBy(desc(leaves.createdAt));
  }

  async createLeave(leave: InsertLeave): Promise<Leave> {
    const [newLeave] = await db
      .insert(leaves)
      .values(leave)
      .returning();
    return newLeave;
  }

  async updateLeaveStatus(id: string, status: string, approvedBy?: string): Promise<Leave | undefined> {
    const [updated] = await db
      .update(leaves)
      .set({ 
        status,
        approvedBy: approvedBy || null,
        approvedAt: status === 'approved' || status === 'rejected' ? new Date() : null,
        updatedAt: new Date()
      })
      .where(eq(leaves.id, id))
      .returning();
    return updated;
  }

  // Payroll operations
  async getPayrolls(): Promise<Payroll[]> {
    return await db.select().from(payroll).orderBy(desc(payroll.year), desc(payroll.month));
  }

  async createPayroll(payrollData: InsertPayroll): Promise<Payroll> {
    const [newPayroll] = await db
      .insert(payroll)
      .values(payrollData)
      .returning();
    return newPayroll;
  }

  // Formation operations
  async getFormations(): Promise<Formation[]> {
    return await db.select().from(formations).orderBy(desc(formations.startDate));
  }

  async createFormation(formation: InsertFormation): Promise<Formation> {
    const [newFormation] = await db
      .insert(formations)
      .values(formation)
      .returning();
    return newFormation;
  }

  // Notification operations
  async getNotifications(userId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db
      .insert(notifications)
      .values(notification)
      .returning();
    return newNotification;
  }

  // Messaging operations
  async getConversations(userId: string): Promise<Conversation[]> {
    const userConversations = await db
      .select({ conversationId: conversationParticipants.conversationId })
      .from(conversationParticipants)
      .where(eq(conversationParticipants.userId, userId));

    if (userConversations.length === 0) {
      return [];
    }

    const convIds = userConversations.map(c => c.conversationId);
    return await db
      .select()
      .from(conversations)
      .where(sql`${conversations.id} = ANY(ARRAY[${convIds}]::text[])`);
  }

  async createConversation(conversation: InsertConversation): Promise<Conversation> {
    const [newConversation] = await db
      .insert(conversations)
      .values(conversation)
      .returning();
    return newConversation;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);
  }

  async sendMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values(message)
      .returning();
    return newMessage;
  }

  async addParticipant(conversationId: string, userId: string): Promise<void> {
    await db
      .insert(conversationParticipants)
      .values({ conversationId, userId })
      .onConflictDoNothing();
  }

  // Mission Orders operations
  async getMissionOrders(): Promise<MissionOrder[]> {
    return await db.select().from(missionOrders).orderBy(desc(missionOrders.createdAt));
  }

  async createMissionOrder(order: InsertMissionOrder): Promise<MissionOrder> {
    const orderNumber = `MO-${Date.now()}`;
    const [newOrder] = await db
      .insert(missionOrders)
      .values({ ...order, orderNumber })
      .returning();
    return newOrder;
  }

  async updateMissionOrder(id: string, orderData: Partial<InsertMissionOrder>): Promise<MissionOrder | undefined> {
    const [updated] = await db
      .update(missionOrders)
      .set({ ...orderData, updatedAt: new Date() })
      .where(eq(missionOrders.id, id))
      .returning();
    return updated;
  }

  // Travel operations
  async getTravels(): Promise<Travel[]> {
    return await db.select().from(travels).orderBy(desc(travels.createdAt));
  }

  async createTravel(travel: InsertTravel): Promise<Travel> {
    const [newTravel] = await db
      .insert(travels)
      .values(travel)
      .returning();
    return newTravel;
  }

  async updateTravel(id: string, travelData: Partial<InsertTravel>): Promise<Travel | undefined> {
    const [updated] = await db
      .update(travels)
      .set({ ...travelData, updatedAt: new Date() })
      .where(eq(travels.id, id))
      .returning();
    return updated;
  }

  // Organizational operations
  async getDirections(): Promise<any[]> {
    return await db.select().from(directions).orderBy(directions.name);
  }

  async getPoles(): Promise<any[]> {
    return await db.select().from(poles).orderBy(poles.region);
  }

  async getUnits(): Promise<any[]> {
    return await db.select().from(units).orderBy(units.city);
  }

  async getCentralDirections(): Promise<any[]> {
    return await db.select().from(centralDirections).orderBy(centralDirections.name);
  }

  async getPoleServices(poleId: string): Promise<any[]> {
    return await db.select().from(poleServices).where(eq(poleServices.poleId, poleId)).orderBy(poleServices.name);
  }

  async createDirection(data: any): Promise<any> {
    const [direction] = await db
      .insert(directions)
      .values(data)
      .returning();
    return direction;
  }

  async createPole(data: any): Promise<any> {
    const [pole] = await db
      .insert(poles)
      .values(data)
      .returning();
    return pole;
  }

  async createUnit(data: any): Promise<any> {
    const [unit] = await db
      .insert(units)
      .values(data)
      .returning();
    return unit;
  }

  async createCentralDirection(data: any): Promise<any> {
    const [centralDir] = await db
      .insert(centralDirections)
      .values(data)
      .returning();
    return centralDir;
  }

  async createPoleService(data: any): Promise<any> {
    const [service] = await db
      .insert(poleServices)
      .values(data)
      .returning();
    return service;
  }

  // ERP Communications
  async getERPCommunications(userId?: string): Promise<any[]> {
    if (userId) {
      return await db.select().from(erpCommunications).where(eq(erpCommunications.userId, userId)).orderBy(erpCommunications.createdAt);
    }
    return await db.select().from(erpCommunications).orderBy(erpCommunications.createdAt);
  }

  async createERPCommunication(data: any): Promise<any> {
    const [comm] = await db
      .insert(erpCommunications)
      .values(data)
      .returning();
    return comm;
  }

  // Pre-registration check
  async checkPreRegistration(email: string, firstName?: string, lastName?: string): Promise<Employee | undefined> {
    const result = await db.select().from(employees).where(eq(employees.email, email));
    return result[0];
  }

  // Partners operations
  async getPartners(): Promise<Partner[]> {
    return await db.select().from(partners).orderBy(partners.name);
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const [newPartner] = await db.insert(partners).values(partner).returning();
    return newPartner;
  }

  async updatePartner(id: string, partner: Partial<InsertPartner>): Promise<Partner | undefined> {
    const [updated] = await db.update(partners).set(partner).where(eq(partners.id, id)).returning();
    return updated;
  }

  // Project Types operations
  async getProjectTypes(): Promise<ProjectType[]> {
    return await db.select().from(projectTypes);
  }

  // Salary Grids operations
  async getSalaryGrids(): Promise<SalaryGrid[]> {
    return await db.select().from(salaryGrids);
  }

  async createSalaryGrid(data: any): Promise<SalaryGrid> {
    const [newGrid] = await db.insert(salaryGrids).values(data).returning();
    return newGrid;
  }

  // Allowances operations
  async getAllowances(): Promise<Allowance[]> {
    return await db.select().from(allowances);
  }

  async createAllowance(data: any): Promise<Allowance> {
    const [newAllowance] = await db.insert(allowances).values(data).returning();
    return newAllowance;
  }

  // Bonuses operations
  async getBonuses(): Promise<Bonus[]> {
    return await db.select().from(bonuses);
  }

  async createBonus(data: any): Promise<Bonus> {
    const [newBonus] = await db.insert(bonuses).values(data).returning();
    return newBonus;
  }

  // Travel Expenses operations
  async getTravelExpenses(): Promise<TravelExpense[]> {
    return await db.select().from(travelExpenses);
  }

  async createTravelExpense(data: any): Promise<TravelExpense> {
    const [newExpense] = await db.insert(travelExpenses).values(data).returning();
    return newExpense;
  }

  // Social Benefits operations
  async getSocialBenefits(): Promise<SocialBenefit[]> {
    return await db.select().from(socialBenefits);
  }

  // Employee Donations operations
  async getEmployeeDonations(): Promise<EmployeeDonation[]> {
    return await db.select().from(employeeDonations);
  }

  async createEmployeeDonation(data: any): Promise<EmployeeDonation> {
    const [newDonation] = await db.insert(employeeDonations).values(data).returning();
    return newDonation;
  }

  // Employee Loans operations
  async getEmployeeLoans(): Promise<EmployeeLoan[]> {
    return await db.select().from(employeeLoans);
  }

  async createEmployeeLoan(data: any): Promise<EmployeeLoan> {
    const [newLoan] = await db.insert(employeeLoans).values(data).returning();
    return newLoan;
  }

  async updateEmployeeLoan(id: string, loan: Partial<any>): Promise<EmployeeLoan | undefined> {
    const [updated] = await db.update(employeeLoans).set({...loan, updatedAt: new Date()}).where(eq(employeeLoans.id, id)).returning();
    return updated;
  }

  // Service Customizations operations
  async getServiceCustomizations(poleServiceId: string): Promise<ServiceCustomization[]> {
    return await db.select().from(serviceCustomizations).where(eq(serviceCustomizations.poleServiceId, poleServiceId));
  }

  async createServiceCustomization(data: any): Promise<ServiceCustomization> {
    const [newCustomization] = await db.insert(serviceCustomizations).values(data).returning();
    return newCustomization;
  }

  // Company Settings operations
  async getCompanySetting(key: string): Promise<CompanySetting | undefined> {
    const [setting] = await db.select().from(companySettings).where(eq(companySettings.key, key));
    return setting;
  }

  async getCompanySettings(): Promise<CompanySetting[]> {
    return await db.select().from(companySettings);
  }

  async setCompanySetting(key: string, value: string, description?: string, category?: string, userId?: string): Promise<CompanySetting> {
    const [setting] = await db
      .insert(companySettings)
      .values({ key, value, description, category, updatedBy: userId })
      .onConflictDoUpdate({
        target: companySettings.key,
        set: { value, description, category, updatedBy: userId, updatedAt: new Date() },
      })
      .returning();
    return setting;
  }

  // Dashboard stats
  async getDashboardStats(): Promise<any> {
    const totalEmployees = await db.select().from(employees).where(eq(employees.status, 'active'));
    const activeProjects = await db.select().from(projects).where(eq(projects.status, 'in_progress'));
    const totalDocuments = await db.select().from(documents);
    const pendingLeaves = await db.select().from(leaves).where(eq(leaves.status, 'pending'));

    const recentProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(5);

    return {
      totalEmployees: totalEmployees.length,
      activeProjects: activeProjects.length,
      totalDocuments: totalDocuments.length,
      pendingLeaves: pendingLeaves.length,
      recentProjects,
    };
  }
}

export const storage = new DatabaseStorage();
