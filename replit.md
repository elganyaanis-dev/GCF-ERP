# ERP Rail Electr & GCF - Documentation

## Overview
This project is a comprehensive Enterprise Resource Planning (ERP) system designed for Rail Electr (filiale GCF) and GCF. It integrates Human Resources, project management, document control, mission orders, advanced payroll with Algerian legislation compliance, social benefits, partner/supplier management, and service-specific customization. The system aims to streamline operations across various departments and operational poles, providing a robust solution for organizational management.

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
- **Email**: Nodemailer integration with SMTP configuration (env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM)

### Feature Specifications
The ERP system includes the following core modules:
- **Authentication & Security**: Secure login, pre-registration validation, RBAC, and masked supreme access levels. Supreme admin (elganya.anis@gmail.com) has console access for direct project modifications.
- **Human Resources**: Employee management, unit/service assignment, supervisor relations, and integration with salary grids.
- **Leave Management**: Request and approval workflow for various leave types.
- **Advanced Payroll**: Configurable salary grids, indemnities, bonuses, detailed travel expenses, multi-country support, and Algerian legislation compliance (CNSS 8%, Assurance Chômage 0.5%, IRG progressive taxation).
- **Social Benefits**: Management of health insurance, retirement, death insurance, configurable by position.
- **Social Management**: Employee donations and loan management with approval conditions.
- **Training Management**: Course catalog, employee enrollment, and skill tracking.
- **Project Management**: Project types (public, direct contract, subcontracting), budget tracking, task management, and integration with partners/suppliers.
- **Partners & Suppliers**: Comprehensive database for collaborators, suppliers, and subcontractors with status tracking.
- **Document Management**: Upload, versioning, classification, and archiving of documents. Templates for Algerian administrative documents (Attestation de Travail, Fiche de Paie, Ordre de Service, Certificat d'Adhésion).
- **Mission Orders**: Creation, approval workflow, destination, and budget tracking.
- **Travel Management**: Travel requests, detailed expense tracking, and approval.
- **Internal Messaging**: Direct and group conversations with real-time updates.
- **Organizational Structure**: 4 Operational Poles (Extrême-Est, Ouest, Sud, Centre), each with:
  - Services (Réalisation, Soutien/Personnel, Achat et Inventaire, Sécurité et QHSE)
  - Study Units and Wilaya Units
  - Pole directors and project managers
- **Email Communications**: Document sending via employee emails using nodemailer (SMTP configured).
- **Analytics & Reporting**: Dashboards with key statistics on employees, projects, and financial data.
- **ERP Communications**: System for user feedback, modification requests, bug reporting, and feature requests.

### Organizational Structure
- **Supreme Admin**: elganya.anis@gmail.com with special console for modifications
- **4 Operational Poles**:
  1. **Extrême-Est (Tamanrasset)**: Study Unit, Tamanrasset Wilaya Unit, Tiliemisen Wilaya Unit
  2. **Ouest (Béchar)**: Study Unit, Béchar Wilaya Unit, Saïda Wilaya Unit
  3. **Sud (In-Salah)**: Study Unit, In-Salah Wilaya Unit, Ouargla Wilaya Unit
  4. **Centre (Alger)**: Study Unit, Alger Wilaya Unit, Blida Wilaya Unit
- **Each Pole Has 4 Services**:
  - Réalisation (Realization/Construction)
  - Soutien (Support/Personnel)
  - Achat et Inventaire (Procurement/Inventory)
  - Sécurité et QHSE (Security & Health/Safety)

### System Design Choices
The architecture emphasizes modularity and scalability, allowing independent operational poles to collaborate. Security is paramount, with strong authentication, authorization, and data validation practices. The system supports multi-country payroll configurations with specific Algerian legislation compliance. Landing page now requires authentication - no unauthenticated access allowed.

### API Endpoints - New Features
- **Email/Documents**:
  - `POST /api/send-email` - Send emails with document templates
  - `GET /api/document-templates` - List available Algerian administrative templates
  - `POST /api/generate-payslip` - Generate payslips (Algerian legislation compliant)
- **Organizational Structure**:
  - `GET /api/poles` - List all 4 operational poles
  - `GET /api/poles/:poleId/services` - Get services for a pole (4 per pole)
  - `GET /api/services/:serviceId/units` - Get units for a service (study + wilaya units)
  - `GET /api/company-settings` - Get company configuration
  - `POST /api/company-settings` - Set company settings (admin only)

### Database Updates
- Created `company_settings` table for storing configuration (address, branding, etc.)
- Created `poles` table with 4 operational poles
- Created `pole_services` table with 16 services (4 per pole)
- Created `units` table with 12 units (study + wilaya units per pole)
- Admin chat auto-processes requests (e.g., address extraction and storage)

## External Dependencies
- **Database**: PostgreSQL (Neon)
- **Authentication**: Replit Auth (OpenID Connect)
- **Email**: Nodemailer (configure via SMTP_* env vars for actual sending)

## Implementation Notes
- Landing page now redirects authenticated users to dashboard
- Payroll calculations follow Algerian law: CNSS 8%, Assurance Chômage 0.5%, progressive IRG
- Email templates available in `server/emailService.ts` for work certificates, payslips, service orders, and social security certificates
- Nodemailer email service not yet configured - requires SMTP credentials
- All 4 poles with complete structure (directors, services, units) are now in database and accessible via API
