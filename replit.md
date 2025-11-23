# ERP Rail Electr & GCF - Documentation

## Overview
This project is a comprehensive Enterprise Resource Planning (ERP) system designed for Rail Electr and GCF. It integrates Human Resources, project management, document control, mission orders, advanced payroll, social benefits, partner/supplier management, and service-specific customization. The system aims to streamline operations across various departments and operational poles, providing a robust solution for organizational management.

## User Preferences
I prefer detailed explanations and an iterative development approach. Ask before making major changes. I prefer that you do not make changes to the folder `Z` and to the file `Y`.

## System Architecture

### UI/UX Decisions
The frontend utilizes React 18 with TypeScript, styled with Shadcn, Radix UI, and Tailwind CSS for a modern and responsive user interface.

### Technical Implementations
- **Frontend**: React 18 + TypeScript, Shadcn, Radix UI, Tailwind CSS, TanStack React Query v5 for state management, Wouter for routing, React Hook Form with Zod for form validation, and Lucide React for icons.
- **Backend**: Express.js with Node.js.
- **Database**: PostgreSQL (Neon) managed with Drizzle ORM.
- **Authentication**: Replit Auth (OpenID Connect) with mandatory pre-registration validation for enhanced security and session management using `connect-pg-simple` and `express-session`.
- **Validation**: Zod is used for data validation across the system.
- **Security**: Robust Role-Based Access Control (RBAC) with masked accreditation levels (0-4), secure sessions, and generic error messages.

### Feature Specifications
The ERP system includes the following core modules:
- **Authentication & Security**: Secure login, pre-registration validation, RBAC, and masked supreme access levels.
- **Human Resources**: Employee management, unit/service assignment, supervisor relations, and integration with salary grids.
- **Leave Management**: Request and approval workflow for various leave types.
- **Advanced Payroll**: Configurable salary grids, indemnities, bonuses, detailed travel expenses, and multi-country support.
- **Social Benefits**: Management of health insurance, retirement, death insurance, configurable by position.
- **Social Management**: Employee donations and loan management with approval conditions.
- **Training Management**: Course catalog, employee enrollment, and skill tracking.
- **Project Management**: Project types (public, direct contract, subcontracting), budget tracking, task management, and integration with partners/suppliers.
- **Partners & Suppliers**: Comprehensive database for collaborators, suppliers, and subcontractors with status tracking.
- **Document Management**: Upload, versioning, classification, and archiving of documents.
- **Mission Orders**: Creation, approval workflow, destination, and budget tracking.
- **Travel Management**: Travel requests, detailed expense tracking, and approval.
- **Internal Messaging**: Direct and group conversations with real-time updates.
- **Organizational Structure**: Management of general directions, central directions, operational poles, and local units.
- **Service Customization**: Specific configurations per service including feature flags, business parameters, and granular permissions.
- **Analytics & Reporting**: Dashboards with key statistics on employees, projects, and financial data.
- **ERP Communications**: System for user feedback, modification requests, bug reporting, and feature requests.

### System Design Choices
The architecture emphasizes modularity and scalability, allowing independent operational poles to collaborate. Security is paramount, with strong authentication, authorization, and data validation practices. The system supports multi-country payroll configurations, highlighting its adaptability.

## External Dependencies
- **Database**: PostgreSQL (Neon)
- **Authentication**: Replit Auth (OpenID Connect)