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
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

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
