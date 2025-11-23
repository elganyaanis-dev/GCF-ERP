import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertEmployeeSchema, insertProjectSchema, insertDocumentSchema, insertLeaveSchema, insertPayrollSchema, insertFormationSchema, insertNotificationSchema, insertConversationSchema, insertMessageSchema, insertMissionOrderSchema, insertTravelSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // ============ AUTH ROUTES ============
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
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

  app.post('/api/organization/directions', isAuthenticated, async (req, res) => {
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

  app.post('/api/organization/poles', isAuthenticated, async (req, res) => {
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

  app.post('/api/organization/units', isAuthenticated, async (req, res) => {
    try {
      const unit = await storage.createUnit(req.body);
      res.status(201).json(unit);
    } catch (error) {
      console.error("Error creating unit:", error);
      res.status(500).json({ message: "Failed to create unit" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
