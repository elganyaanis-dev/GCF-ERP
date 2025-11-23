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
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Failed to create employee" });
    }
  });

  app.patch('/api/employees/:id', isAuthenticated, async (req, res) => {
    try {
      const data = insertEmployeeSchema.partial().parse(req.body);
      const employee = await storage.updateEmployee(req.params.id, data);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Failed to update employee" });
    }
  });

  app.delete('/api/employees/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteEmployee(req.params.id);
      res.json({ message: "Employee deleted" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Failed to delete employee" });
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
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.patch('/api/projects/:id', isAuthenticated, async (req, res) => {
    try {
      const data = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, data);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete('/api/projects/:id', isAuthenticated, async (req, res) => {
    try {
      await storage.deleteProject(req.params.id);
      res.json({ message: "Project deleted" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
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

  app.post('/api/documents', isAuthenticated, async (req: any, res) => {
    try {
      const data = insertDocumentSchema.parse({
        ...req.body,
        uploadedBy: req.user.claims.sub,
      });
      const document = await storage.createDocument(data);
      res.status(201).json(document);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
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
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating leave:", error);
      res.status(500).json({ message: "Failed to create leave" });
    }
  });

  app.patch('/api/leaves/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { status } = req.body;
      const leave = await storage.updateLeaveStatus(req.params.id, status, req.user.claims.sub);
      if (!leave) {
        return res.status(404).json({ message: "Leave not found" });
      }
      res.json(leave);
    } catch (error) {
      console.error("Error updating leave:", error);
      res.status(500).json({ message: "Failed to update leave" });
    }
  });

  // ============ PAYROLL ROUTES ============
  app.get('/api/payroll', isAuthenticated, async (req, res) => {
    try {
      const payrolls = await storage.getPayrolls();
      res.json(payrolls);
    } catch (error) {
      console.error("Error fetching payrolls:", error);
      res.status(500).json({ message: "Failed to fetch payrolls" });
    }
  });

  app.post('/api/payroll', isAuthenticated, async (req, res) => {
    try {
      const data = insertPayrollSchema.parse(req.body);
      const payroll = await storage.createPayroll(data);
      res.status(201).json(payroll);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating payroll:", error);
      res.status(500).json({ message: "Failed to create payroll" });
    }
  });

  // ============ FORMATIONS ROUTES ============
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
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating formation:", error);
      res.status(500).json({ message: "Failed to create formation" });
    }
  });

  // ============ NOTIFICATIONS ROUTES ============
  app.get('/api/notifications', isAuthenticated, async (req: any, res) => {
    try {
      const notifications = await storage.getNotifications(req.user.claims.sub);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post('/api/notifications', isAuthenticated, async (req, res) => {
    try {
      const data = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(data);
      res.status(201).json(notification);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating notification:", error);
      res.status(500).json({ message: "Failed to create notification" });
    }
  });

  // ============ ANALYTICS ROUTES ============
  app.get('/api/analytics', isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // ============ MESSAGING ROUTES ============
  app.get('/api/conversations', isAuthenticated, async (req: any, res) => {
    try {
      const conversations = await storage.getConversations(req.user.claims.sub);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  app.post('/api/conversations', isAuthenticated, async (req: any, res) => {
    try {
      const data = insertConversationSchema.parse({
        ...req.body,
        createdBy: req.user.claims.sub,
      });
      const conversation = await storage.createConversation(data);
      
      // Add creator as participant
      await storage.addParticipant(conversation.id, req.user.claims.sub);
      
      res.status(201).json(conversation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating conversation:", error);
      res.status(500).json({ message: "Failed to create conversation" });
    }
  });

  app.get('/api/conversations/:id/messages', isAuthenticated, async (req, res) => {
    try {
      const messages = await storage.getMessages(req.params.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post('/api/conversations/:id/messages', isAuthenticated, async (req: any, res) => {
    try {
      const data = insertMessageSchema.parse({
        ...req.body,
        conversationId: req.params.id,
        senderId: req.user.claims.sub,
      });
      const message = await storage.sendMessage(data);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.post('/api/conversations/:id/participants', isAuthenticated, async (req, res) => {
    try {
      const { userId } = req.body;
      await storage.addParticipant(req.params.id, userId);
      res.json({ message: "Participant added" });
    } catch (error) {
      console.error("Error adding participant:", error);
      res.status(500).json({ message: "Failed to add participant" });
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
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating mission order:", error);
      res.status(500).json({ message: "Failed to create mission order" });
    }
  });

  app.patch('/api/mission-orders/:id', isAuthenticated, async (req, res) => {
    try {
      const data = insertMissionOrderSchema.partial().parse(req.body);
      const order = await storage.updateMissionOrder(req.params.id, data);
      if (!order) {
        return res.status(404).json({ message: "Mission order not found" });
      }
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error updating mission order:", error);
      res.status(500).json({ message: "Failed to update mission order" });
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
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating travel:", error);
      res.status(500).json({ message: "Failed to create travel" });
    }
  });

  app.patch('/api/travels/:id', isAuthenticated, async (req, res) => {
    try {
      const data = insertTravelSchema.partial().parse(req.body);
      const travel = await storage.updateTravel(req.params.id, data);
      if (!travel) {
        return res.status(404).json({ message: "Travel not found" });
      }
      res.json(travel);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error updating travel:", error);
      res.status(500).json({ message: "Failed to update travel" });
    }
  });

  // ============ ORGANIZATION ROUTES ============
  app.get('/api/organization/directions', isAuthenticated, async (req, res) => {
    try {
      const dirs = await storage.getDirections();
      res.json(dirs);
    } catch (error) {
      console.error("Error fetching directions:", error);
      res.status(500).json({ message: "Failed to fetch directions" });
    }
  });

  // Middleware to check admin-only access for structure modifications
  const requireAdmin = (req: any, res: any, next: any) => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé" });
    }
    next();
  };

  app.post('/api/organization/directions', isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const direction = await storage.createDirection(req.body);
      res.status(201).json(direction);
    } catch (error) {
      console.error("Error creating direction:", error);
      res.status(500).json({ message: "Failed to create direction" });
    }
  });

  app.get('/api/organization/poles', isAuthenticated, async (req, res) => {
    try {
      const poles = await storage.getPoles();
      res.json(poles);
    } catch (error) {
      console.error("Error fetching poles:", error);
      res.status(500).json({ message: "Failed to fetch poles" });
    }
  });

  app.post('/api/organization/poles', isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const pole = await storage.createPole(req.body);
      res.status(201).json(pole);
    } catch (error) {
      console.error("Error creating pole:", error);
      res.status(500).json({ message: "Failed to create pole" });
    }
  });

  app.get('/api/organization/units', isAuthenticated, async (req, res) => {
    try {
      const units = await storage.getUnits();
      res.json(units);
    } catch (error) {
      console.error("Error fetching units:", error);
      res.status(500).json({ message: "Failed to fetch units" });
    }
  });

  app.post('/api/organization/units', isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const unit = await storage.createUnit(req.body);
      res.status(201).json(unit);
    } catch (error) {
      console.error("Error creating unit:", error);
      res.status(500).json({ message: "Failed to create unit" });
    }
  });

  // ============ CENTRAL DIRECTIONS ROUTES ============
  app.get('/api/organization/central-directions', isAuthenticated, async (req, res) => {
    try {
      const dirs = await storage.getCentralDirections();
      res.json(dirs);
    } catch (error) {
      console.error("Error fetching central directions:", error);
      res.status(500).json({ message: "Failed to fetch central directions" });
    }
  });

  app.post('/api/organization/central-directions', isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const dir = await storage.createCentralDirection(req.body);
      res.status(201).json(dir);
    } catch (error) {
      console.error("Error creating central direction:", error);
      res.status(500).json({ message: "Failed to create central direction" });
    }
  });

  // ============ POLE SERVICES ROUTES ============
  app.get('/api/organization/poles/:poleId/services', isAuthenticated, async (req, res) => {
    try {
      const services = await storage.getPoleServices(req.params.poleId);
      res.json(services);
    } catch (error) {
      console.error("Error fetching pole services:", error);
      res.status(500).json({ message: "Failed to fetch pole services" });
    }
  });

  app.post('/api/organization/pole-services', isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const service = await storage.createPoleService(req.body);
      res.status(201).json(service);
    } catch (error) {
      console.error("Error creating pole service:", error);
      res.status(500).json({ message: "Failed to create pole service" });
    }
  });

  // ============ ERP COMMUNICATIONS ROUTES ============
  app.get('/api/erp-communications', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.claims?.sub || (req.user as any)?.id;
      const comms = await storage.getERPCommunications(userId);
      res.json(comms);
    } catch (error) {
      console.error("Error fetching ERP communications:", error);
      res.status(500).json({ message: "Failed to fetch communications" });
    }
  });

  app.post('/api/erp-communications', isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any)?.claims?.sub || (req.user as any)?.id;
      const comm = await storage.createERPCommunication({
        userId: userId,
        subject: req.body.subject,
        message: req.body.message,
        type: req.body.type || "feedback",
      });
      res.status(201).json(comm);
    } catch (error) {
      console.error("Error creating ERP communication:", error);
      res.status(500).json({ message: "Failed to create communication" });
    }
  });

  // ============ PARTNERS ROUTES ============
  app.get('/api/partners', isAuthenticated, async (req, res) => {
    try {
      const partners = await storage.getPartners();
      res.json(partners);
    } catch (error) {
      console.error("Error fetching partners:", error);
      res.status(500).json({ message: "Failed to fetch partners" });
    }
  });

  app.post('/api/partners', isAuthenticated, async (req, res) => {
    try {
      const partner = await storage.createPartner(req.body);
      res.status(201).json(partner);
    } catch (error) {
      console.error("Error creating partner:", error);
      res.status(500).json({ message: "Failed to create partner" });
    }
  });

  app.patch('/api/partners/:id', isAuthenticated, async (req, res) => {
    try {
      const partner = await storage.updatePartner(req.params.id, req.body);
      if (!partner) return res.status(404).json({ message: "Partner not found" });
      res.json(partner);
    } catch (error) {
      console.error("Error updating partner:", error);
      res.status(500).json({ message: "Failed to update partner" });
    }
  });

  // ============ PROJECT TYPES ROUTES ============
  app.get('/api/project-types', isAuthenticated, async (req, res) => {
    try {
      const types = await storage.getProjectTypes();
      res.json(types);
    } catch (error) {
      console.error("Error fetching project types:", error);
      res.status(500).json({ message: "Failed to fetch project types" });
    }
  });

  // ============ SALARY MANAGEMENT ROUTES ============
  app.get('/api/salary-grids', isAuthenticated, async (req, res) => {
    try {
      const grids = await storage.getSalaryGrids();
      res.json(grids);
    } catch (error) {
      console.error("Error fetching salary grids:", error);
      res.status(500).json({ message: "Failed to fetch salary grids" });
    }
  });

  app.post('/api/salary-grids', isAuthenticated, async (req, res) => {
    try {
      const grid = await storage.createSalaryGrid(req.body);
      res.status(201).json(grid);
    } catch (error) {
      console.error("Error creating salary grid:", error);
      res.status(500).json({ message: "Failed to create salary grid" });
    }
  });

  app.get('/api/allowances', isAuthenticated, async (req, res) => {
    try {
      const allowances = await storage.getAllowances();
      res.json(allowances);
    } catch (error) {
      console.error("Error fetching allowances:", error);
      res.status(500).json({ message: "Failed to fetch allowances" });
    }
  });

  app.post('/api/allowances', isAuthenticated, async (req, res) => {
    try {
      const allowance = await storage.createAllowance(req.body);
      res.status(201).json(allowance);
    } catch (error) {
      console.error("Error creating allowance:", error);
      res.status(500).json({ message: "Failed to create allowance" });
    }
  });

  // ============ BONUSES & TRAVEL EXPENSES ROUTES ============
  app.get('/api/bonuses', isAuthenticated, async (req, res) => {
    try {
      const bonuses = await storage.getBonuses();
      res.json(bonuses);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      res.status(500).json({ message: "Failed to fetch bonuses" });
    }
  });

  app.post('/api/bonuses', isAuthenticated, async (req, res) => {
    try {
      const bonus = await storage.createBonus(req.body);
      res.status(201).json(bonus);
    } catch (error) {
      console.error("Error creating bonus:", error);
      res.status(500).json({ message: "Failed to create bonus" });
    }
  });

  app.get('/api/travel-expenses', isAuthenticated, async (req, res) => {
    try {
      const expenses = await storage.getTravelExpenses();
      res.json(expenses);
    } catch (error) {
      console.error("Error fetching travel expenses:", error);
      res.status(500).json({ message: "Failed to fetch travel expenses" });
    }
  });

  app.post('/api/travel-expenses', isAuthenticated, async (req, res) => {
    try {
      const expense = await storage.createTravelExpense(req.body);
      res.status(201).json(expense);
    } catch (error) {
      console.error("Error creating travel expense:", error);
      res.status(500).json({ message: "Failed to create travel expense" });
    }
  });

  // ============ SOCIAL BENEFITS ROUTES ============
  app.get('/api/social-benefits', isAuthenticated, async (req, res) => {
    try {
      const benefits = await storage.getSocialBenefits();
      res.json(benefits);
    } catch (error) {
      console.error("Error fetching social benefits:", error);
      res.status(500).json({ message: "Failed to fetch social benefits" });
    }
  });

  // ============ EMPLOYEE DONATIONS ROUTES ============
  app.get('/api/employee-donations', isAuthenticated, async (req, res) => {
    try {
      const donations = await storage.getEmployeeDonations();
      res.json(donations);
    } catch (error) {
      console.error("Error fetching donations:", error);
      res.status(500).json({ message: "Failed to fetch donations" });
    }
  });

  app.post('/api/employee-donations', isAuthenticated, async (req, res) => {
    try {
      const donation = await storage.createEmployeeDonation(req.body);
      res.status(201).json(donation);
    } catch (error) {
      console.error("Error creating donation:", error);
      res.status(500).json({ message: "Failed to create donation" });
    }
  });

  // ============ EMPLOYEE LOANS ROUTES ============
  app.get('/api/employee-loans', isAuthenticated, async (req, res) => {
    try {
      const loans = await storage.getEmployeeLoans();
      res.json(loans);
    } catch (error) {
      console.error("Error fetching loans:", error);
      res.status(500).json({ message: "Failed to fetch loans" });
    }
  });

  app.post('/api/employee-loans', isAuthenticated, async (req, res) => {
    try {
      const loan = await storage.createEmployeeLoan(req.body);
      res.status(201).json(loan);
    } catch (error) {
      console.error("Error creating loan:", error);
      res.status(500).json({ message: "Failed to create loan" });
    }
  });

  app.patch('/api/employee-loans/:id', isAuthenticated, async (req, res) => {
    try {
      const loan = await storage.updateEmployeeLoan(req.params.id, req.body);
      if (!loan) return res.status(404).json({ message: "Loan not found" });
      res.json(loan);
    } catch (error) {
      console.error("Error updating loan:", error);
      res.status(500).json({ message: "Failed to update loan" });
    }
  });

  // ============ SERVICE CUSTOMIZATIONS ROUTES ============
  app.get('/api/service-customizations/:poleServiceId', isAuthenticated, async (req, res) => {
    try {
      const customizations = await storage.getServiceCustomizations(req.params.poleServiceId);
      res.json(customizations);
    } catch (error) {
      console.error("Error fetching customizations:", error);
      res.status(500).json({ message: "Failed to fetch customizations" });
    }
  });

  app.post('/api/service-customizations', isAuthenticated, async (req, res) => {
    try {
      const customization = await storage.createServiceCustomization(req.body);
      res.status(201).json(customization);
    } catch (error) {
      console.error("Error creating customization:", error);
      res.status(500).json({ message: "Failed to create customization" });
    }
  });

  // ============ ADMIN CONSOLE ROUTES ============
  let adminMessages: any[] = [];

  app.get('/api/admin/communications', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || !user.isSupremeAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
      res.json(adminMessages);
    } catch (error) {
      console.error("Error fetching admin communications:", error);
      res.status(500).json({ message: "Failed to fetch communications" });
    }
  });

  app.post('/api/admin/communications', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || !user.isSupremeAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }

      const { content, sender, type } = req.body;
      if (!content || !sender) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const message = {
        id: Math.random().toString(36).substring(7),
        sender,
        content,
        timestamp: new Date().toISOString(),
        type: type || "admin",
      };

      adminMessages.push(message);

      // Auto-process admin messages for common commands
      if (content.toLowerCase().includes("adresse") || content.toLowerCase().includes("address")) {
        const addressMatch = content.match(/(?:l'adresse|address)[:\s]+([^|]+)/i);
        if (addressMatch) {
          const address = addressMatch[1].trim();
          await storage.setCompanySetting("company_address", address, "Company main address", "address", user.id);
        }
      }

      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating admin communication:", error);
      res.status(500).json({ message: "Failed to create communication" });
    }
  });

  // ============ COMPANY SETTINGS ROUTES ============
  app.get('/api/company-settings', async (req, res) => {
    try {
      const settings = await storage.getCompanySettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching company settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.get('/api/company-settings/:key', async (req, res) => {
    try {
      const setting = await storage.getCompanySetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ message: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      console.error("Error fetching setting:", error);
      res.status(500).json({ message: "Failed to fetch setting" });
    }
  });

  app.post('/api/company-settings', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || !user.isSupremeAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }

      const { key, value, description, category } = req.body;
      const setting = await storage.setCompanySetting(key, value, description, category, user.id);
      res.status(201).json(setting);
    } catch (error) {
      console.error("Error setting company setting:", error);
      res.status(500).json({ message: "Failed to set setting" });
    }
  });

  // ============ EMAIL & DOCUMENT ROUTES ============
  // Note: Email service uses nodemailer - SMTP configuration via env vars
  // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM

  app.post('/api/send-email', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user) {
        return res.status(403).json({ message: "Access denied" });
      }

      const { to, subject } = req.body;
      if (!to || !subject) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Email service ready - configure SMTP via environment variables
      res.json({ message: "Email sending ready - configure SMTP_* environment variables for actual sending" });
    } catch (error) {
      console.error("Error with email:", error);
      res.status(500).json({ message: "Failed to process email" });
    }
  });

  app.get('/api/document-templates', (req, res) => {
    res.json({
      templates: {
        attestationTravail: 'Work certificate - Attestation de Travail',
        fichePaie: 'Payslip - Fiche de Paie (Algerian legislation compliant)',
        ordreDeService: 'Service order - Ordre de Service',
        certificatAdhesion: 'Social security certificate - Certificat d\'Adhésion'
      },
      note: 'These templates are available in server/emailService.ts for generation'
    });
  });

  app.post('/api/generate-payslip', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user || (user.role !== 'admin' && user.role !== 'manager' && !user.isSupremeAdmin)) {
        return res.status(403).json({ message: "Access denied" });
      }

      const { employeeName, baseSalary, allowances, month } = req.body;
      if (!employeeName || !baseSalary || !month) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Payroll calculation logic - Algerian legislation compliant
      const cnss = baseSalary * 0.08; // 8% CNSS
      const assuranceChomage = baseSalary * 0.005; // 0.5% Unemployment
      const grossSalary = baseSalary + (allowances?.total || 0);
      const totalDeductions = cnss + assuranceChomage;
      const netSalary = grossSalary - totalDeductions;

      res.json({ 
        payroll: {
          employeeName,
          baseSalary,
          grossSalary,
          deductions: { cnss, assuranceChomage, total: totalDeductions },
          netSalary,
          month
        }
      });
    } catch (error) {
      console.error("Error generating payslip:", error);
      res.status(500).json({ message: "Failed to generate payslip" });
    }
  });

  // ============ POLES & ORGANIZATIONAL STRUCTURE ============
  app.get('/api/poles', async (req, res) => {
    try {
      const poles = await storage.getPoles();
      res.json(poles);
    } catch (error) {
      console.error("Error fetching poles:", error);
      res.status(500).json({ message: "Failed to fetch poles" });
    }
  });

  app.get('/api/poles/:poleId/services', async (req, res) => {
    try {
      const services = await storage.getPoleServices(req.params.poleId);
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get('/api/services/:serviceId/units', async (req, res) => {
    try {
      const units = await storage.getUnits(req.params.serviceId);
      res.json(units);
    } catch (error) {
      console.error("Error fetching units:", error);
      res.status(500).json({ message: "Failed to fetch units" });
    }
  });

  // ============ SUBSIDIARIES & GROUP MANAGEMENT (GCF) ============
  app.get('/api/subsidiaries', isAuthenticated, async (req, res) => {
    try {
      const subs = await storage.getSubsidiaries();
      res.json(subs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subsidiaries" });
    }
  });

  app.get('/api/subsidiaries/:subsidiaryId', isAuthenticated, async (req, res) => {
    try {
      const sub = await storage.getSubsidiaryById(req.params.subsidiaryId);
      res.json(sub);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subsidiary" });
    }
  });

  app.get('/api/subsidiaries/:subsidiaryId/poles', isAuthenticated, async (req, res) => {
    try {
      const poles = await storage.getPolesBySubsidiary(req.params.subsidiaryId);
      res.json(poles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch poles" });
    }
  });

  // ============ ASSETS & VEHICLES (Logistics) ============
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

  const httpServer = createServer(app);
  return httpServer;
}
