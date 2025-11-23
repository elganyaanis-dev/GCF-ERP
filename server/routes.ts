import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth_v2";
import { setupAdminChat } from "./routes_admin_chat";
import { insertEmployeeSchema, insertProjectSchema, insertDocumentSchema, insertLeaveSchema, insertPayrollSchema, insertFormationSchema, insertNotificationSchema, insertConversationSchema, insertMessageSchema, insertMissionOrderSchema, insertTravelSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);
  
  // Setup admin chat channel
  setupAdminChat(app);

  // ============ AUTH ROUTES ============
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      // Don't expose admin/director roles or accreditation levels to frontend
      if (user) {
        const { role, accreditationLevel, ...safeUser } = user;
        res.json(safeUser);
      } else {
        res.json({ id: userId });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get('/api/user/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User profile not found" });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post('/api/logout', async (req, res) => {
    try {
      res.clearCookie('sessionid');
      res.clearCookie('connect.sid');
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ message: "Failed to logout" });
    }
  });

  // ============ DASHBOARD ROUTES ============
  app.get('/api/dashboard/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // ============ EMPLOYEES ROUTES ============
  app.get('/api/employees', isAuthenticated, async (req, res) => {
    try {
      const employees = await storage.getEmployees();
      res.json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  app.get('/api/employees/:id', isAuthenticated, async (req, res) => {
    try {
      const employee = await storage.getEmployee(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      console.error("Error fetching employee:", error);
      res.status(500).json({ message: "Failed to fetch employee" });
    }
  });

  app.post('/api/employees', isAuthenticated, async (req, res) => {
    try {
      const data = insertEmployeeSchema.parse(req.body);
      const employee = await storage.createEmployee(data);
      res.status(201).json(employee);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid employee data", errors: error.errors });
      }
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Failed to create employee" });
    }
  });

  // ============ PROJECTS ROUTES ============
  app.get('/api/projects', isAuthenticated, async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:id', isAuthenticated, async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post('/api/projects', isAuthenticated, async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // ============ DOCUMENTS ROUTES ============
  app.get('/api/documents', isAuthenticated, async (req, res) => {
    try {
      const documents = await storage.getDocuments();
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.get('/api/documents/:id', isAuthenticated, async (req, res) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      console.error("Error fetching document:", error);
      res.status(500).json({ message: "Failed to fetch document" });
    }
  });

  app.post('/api/documents', isAuthenticated, async (req, res) => {
    try {
      const data = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument(data);
      res.status(201).json(document);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid document data", errors: error.errors });
      }
      console.error("Error creating document:", error);
      res.status(500).json({ message: "Failed to create document" });
    }
  });

  // ============ LEAVES ROUTES ============
  app.get('/api/leaves', isAuthenticated, async (req, res) => {
    try {
      const leaves = await storage.getLeaves();
      res.json(leaves);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      res.status(500).json({ message: "Failed to fetch leaves" });
    }
  });

  app.post('/api/leaves', isAuthenticated, async (req, res) => {
    try {
      const data = insertLeaveSchema.parse(req.body);
      const leave = await storage.createLeave(data);
      res.status(201).json(leave);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid leave data", errors: error.errors });
      }
      console.error("Error creating leave:", error);
      res.status(500).json({ message: "Failed to create leave" });
    }
  });

  // ============ PAYROLL ROUTES ============
  app.get('/api/payroll', isAuthenticated, async (req, res) => {
    try {
      const payrolls = await storage.getPayrolls();
      res.json(payrolls);
    } catch (error) {
      console.error("Error fetching payroll:", error);
      res.status(500).json({ message: "Failed to fetch payroll" });
    }
  });

  app.post('/api/payroll', isAuthenticated, async (req, res) => {
    try {
      const data = insertPayrollSchema.parse(req.body);
      const payroll = await storage.createPayroll(data);
      res.status(201).json(payroll);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid payroll data", errors: error.errors });
      }
      console.error("Error creating payroll:", error);
      res.status(500).json({ message: "Failed to create payroll" });
    }
  });

  // ============ FORMATION ROUTES ============
  app.get('/api/formations', isAuthenticated, async (req, res) => {
    try {
      const formations = await storage.getFormations();
      res.json(formations);
    } catch (error) {
      console.error("Error fetching formations:", error);
      res.status(500).json({ message: "Failed to fetch formations" });
    }
  });

  app.post('/api/formations', isAuthenticated, async (req, res) => {
    try {
      const data = insertFormationSchema.parse(req.body);
      const formation = await storage.createFormation(data);
      res.status(201).json(formation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid formation data", errors: error.errors });
      }
      console.error("Error creating formation:", error);
      res.status(500).json({ message: "Failed to create formation" });
    }
  });

  // ============ MISSION ORDERS ROUTES ============
  app.get('/api/mission-orders', isAuthenticated, async (req, res) => {
    try {
      const orders = await storage.getMissionOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching mission orders:", error);
      res.status(500).json({ message: "Failed to fetch mission orders" });
    }
  });

  app.post('/api/mission-orders', isAuthenticated, async (req, res) => {
    try {
      const data = insertMissionOrderSchema.parse(req.body);
      const order = await storage.createMissionOrder(data);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid mission order data", errors: error.errors });
      }
      console.error("Error creating mission order:", error);
      res.status(500).json({ message: "Failed to create mission order" });
    }
  });

  // ============ TRAVELS ROUTES ============
  app.get('/api/travels', isAuthenticated, async (req, res) => {
    try {
      const travels = await storage.getTravels();
      res.json(travels);
    } catch (error) {
      console.error("Error fetching travels:", error);
      res.status(500).json({ message: "Failed to fetch travels" });
    }
  });

  app.post('/api/travels', isAuthenticated, async (req, res) => {
    try {
      const data = insertTravelSchema.parse(req.body);
      const travel = await storage.createTravel(data);
      res.status(201).json(travel);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid travel data", errors: error.errors });
      }
      console.error("Error creating travel:", error);
      res.status(500).json({ message: "Failed to create travel" });
    }
  });

  // ============ ORGANIZATION ROUTES ============
  app.get('/api/organization/directions', isAuthenticated, async (req, res) => {
    try {
      const directions = await storage.getDirections();
      res.json(directions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch directions" });
    }
  });

  app.get('/api/organization/poles', isAuthenticated, async (req, res) => {
    try {
      const poles = await storage.getPoles();
      res.json(poles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch poles" });
    }
  });

  app.get('/api/organization/units', isAuthenticated, async (req, res) => {
    try {
      const units = await storage.getUnits();
      res.json(units);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch units" });
    }
  });

  // ============ SUBSIDIARIES ============
  app.get('/api/subsidiaries', isAuthenticated, async (req, res) => {
    try {
      const subs = await storage.getSubsidiaries();
      res.json(subs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subsidiaries" });
    }
  });

  // ============ ASSETS & BUDGETS ============
  app.get('/api/subsidiaries/:subsidiaryId/assets', isAuthenticated, async (req, res) => {
    try {
      const assets = await storage.getAssets(req.params.subsidiaryId);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });

  app.get('/api/subsidiaries/:subsidiaryId/vehicles', isAuthenticated, async (req, res) => {
    try {
      const vehicles = await storage.getVehicles(req.params.subsidiaryId);
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });

  // ============ BUDGET MANAGEMENT ============
  app.get('/api/subsidiaries/:subsidiaryId/budgets', isAuthenticated, async (req, res) => {
    try {
      const budgets = await storage.getBudgets(req.params.subsidiaryId);
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch budgets" });
    }
  });

  // ============ COMPLIANCE & REGULATIONS ============
  app.get('/api/subsidiaries/:subsidiaryId/compliance', isAuthenticated, async (req, res) => {
    try {
      const items = await storage.getComplianceItems(req.params.subsidiaryId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch compliance items" });
    }
  });

  // ============ DASHBOARD STATS BY SUBSIDIARY ============
  app.get('/api/dashboard/stats/:subsidiaryId', isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats(req.params.subsidiaryId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // ============ TIMESHEETS ============
  app.get('/api/timesheets', isAuthenticated, async (req, res) => {
    try {
      const timesheets = await storage.getTimesheets();
      res.json(timesheets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timesheets" });
    }
  });

  app.post('/api/timesheets', isAuthenticated, async (req, res) => {
    try {
      const ts = await storage.createTimesheet(req.body);
      res.status(201).json(ts);
    } catch (error) {
      res.status(500).json({ message: "Failed to create timesheet" });
    }
  });

  // ============ INVENTORY ============
  app.get('/api/inventory', isAuthenticated, async (req, res) => {
    try {
      const items = await storage.getInventory();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inventory" });
    }
  });

  app.post('/api/inventory', isAuthenticated, async (req, res) => {
    try {
      const item = await storage.createInventoryItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to create inventory item" });
    }
  });

  // ============ CONTRACTS ============
  app.get('/api/contracts', isAuthenticated, async (req, res) => {
    try {
      const contracts = await storage.getContracts();
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contracts" });
    }
  });

  app.post('/api/contracts', isAuthenticated, async (req, res) => {
    try {
      const contract = await storage.createContract(req.body);
      res.status(201).json(contract);
    } catch (error) {
      res.status(500).json({ message: "Failed to create contract" });
    }
  });

  // ============ REPORTS & ANALYTICS ============
  app.get('/api/reports/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch report stats" });
    }
  });

  // ============ AUDIT LOGS ============
  app.get('/api/audit-logs/:subsidiaryId', isAuthenticated, async (req, res) => {
    try {
      const logs = await storage.getAuditLogs(req.params.subsidiaryId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
