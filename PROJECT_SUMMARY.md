# ESAP ERP Frontend - Project Summary

## Overview

ESAP (Enterprise System Application Platform) is a **full-scale, enterprise-grade ERP frontend** built as a **Turbo monorepo** using **pnpm workspaces**. It provides modules for CRM, Financial Management, Supply Chain Management, and Human Resources — all within a bilingual (English/Arabic) Next.js application.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.7, React 19 |
| **Monorepo** | Turborepo 2.5 + pnpm 9.15 |
| **Styling** | Tailwind CSS 3.4 + Rizzui |
| **State (Client)** | Jotai (atomic state) |
| **State (Server)** | TanStack React Query 5 |
| **Forms** | React Hook Form + Zod |
| **Tables** | TanStack React Table 8 |
| **Auth** | NextAuth.js 4 (JWT + Google OAuth) |
| **i18n** | next-intl (EN, AR with RTL) |
| **Charts** | Recharts, Reactflow |
| **HTTP** | Axios (custom HttpClient) |
| **Real-time** | Pusher |
| **PDF/Export** | React PDF Renderer, jsPDF, html2canvas |
| **Deployment** | Vercel (standalone builds) |

---

## Monorepo Structure

```
ESAP_Frontend_Base-main/
├── apps/
│   ├── isomorphic-intl/       # Main ERP app (port 3001)
│   └── esap-fms/              # FMS-focused app (port 3002)
├── packages/
│   ├── isomorphic-core/       # Shared components, hooks, utils
│   ├── config-tailwind/       # Shared Tailwind config & theme
│   └── config-typescript/     # Shared TS configs
├── turbo.json                 # Build pipeline
├── pnpm-workspace.yaml        # Workspace definition
└── package.json               # Root scripts & devDeps
```

---

## Apps

### 1. isomorphic-intl (Main ERP App)

- **Port:** 3001
- **Modules:** CRM, FMS, SCM
- **Features:** Full i18n (EN/AR), RTL support, NextAuth, multi-module routing

### 2. esap-fms (Financial Management App)

- **Port:** 3002
- **Modules:** FMS, CRM, HRMS, SCM
- **Features:** Dedicated financial management interface

---

## Core Modules

### CRM — Customer Relationship Management

| Area | Features |
|---|---|
| **Sales** | Leads, Opportunities, Quotations, Sales Orders, Invoices |
| **Customers** | Customer management, Contact management |
| **Marketing** | Campaigns, Targets |
| **Support** | Tickets, Tasks, SLAs |
| **Analytics** | Lead summary, Sales revenue, Deal pipeline, Customer growth |
| **Communication** | Meetings, Reminders, Messages, Notifications |

**Scale:** 15+ containers, 47 hooks, 42 types, 28 validators, 94 API endpoints

---

### FMS — Financial Management System

| Area | Features |
|---|---|
| **Accounting** | Chart of Accounts, Journal Entries, General Ledger, Trial Balance |
| **Banking** | Bank Accounts, Reconciliation, Statements, Transactions, Clearance |
| **Assets** | Asset Register, Depreciation, Maintenance, Movement, Repair |
| **Budgeting** | Budget, Budget Templates, Distribution, Variance Reports |
| **Payments** | Payment Requests, Payment Entries, Mode of Payment |
| **Tax** | Tax Categories, Rules, Templates, ZATCA |
| **Reports** | Balance Sheet, Profit & Loss, Cash Flow, Income Statement |

**Scale:** 39+ containers, 200+ API endpoints, 15 Jotai state atoms

---

### SCM — Supply Chain Management

| Area | Features |
|---|---|
| **Procurement** | Requisitions, Purchase Orders, Supplier Management |
| **Inventory** | Stock Overview, Transfers, Replenishment, Warehouses |
| **Production** | Bill of Materials, Work Order Tracking, Capacity Planning |
| **Logistics** | Shipments, Freight, Return Management |
| **Forecasting** | Demand Forecasting, Sales Operations Planning |
| **Compliance** | Risk Assessment, Risk Evaluation, Compliance Tracking |
| **Reports** | Purchase Analytics, Stock Analytics, BOM Reports |

**Scale:** 9 containers, 14 hooks, 12 types, 10 validators

---

### HRMS — Human Resource Management System

| Area | Features |
|---|---|
| **Employees** | Records, Departments, Job Positions, Types |
| **Attendance** | Attendance tracking, Leave Management, Off Days |
| **Payroll** | Payslips, Contracts, Salary Structures, Rules |
| **Recruitment** | Recruitment, Applications, Applicants |
| **Training** | Programs, Sessions, Participants, Feedback |
| **Appraisal** | Goals, Templates, Feedback |
| **Saudization** | Nitaqat Compliance Tracking |
| **Reports** | Attendance, Leave, Monthly, Expatriate Reports |

**Scale:** 12 hooks, 12 services

---

## Architecture Patterns

### Data Flow

```
UI Component → React Hook Form (form state)
             → Custom Hook (useXxxList, useCreateXxx)
             → Service Class (API call via HttpClient)
             → Axios → Backend REST API
             → React Query (cache & state)
             → Component re-render
```

### Component Pattern (Container/Template)

```
modules/{module}/components/
├── containers/              # Smart components (data + logic)
│   └── {feature}/
│       ├── index.tsx                    # Main list/page container
│       ├── use-column.tsx               # Table column definitions
│       ├── {feature}-table-toolbar.tsx   # Filters & actions
│       ├── {feature}-form.tsx           # Create/Edit form
│       └── {feature}-form-drawer.tsx    # Drawer-based form
├── templates/               # Layout wrappers
└── base/                    # Shared UI pieces
```

### State Management

| Type | Tool | Example |
|---|---|---|
| **Server state** | React Query | API data, lists, details |
| **Client state** | Jotai atoms | Form inputs, filters, UI toggles |
| **Form state** | React Hook Form | Form values, validation, errors |
| **Auth state** | NextAuth session | User, token, roles, permissions |

---

## Authentication Flow

```
User → Sign-In Page → Credentials / Google OAuth
     → NextAuth authorize() → AuthService.login() / loginWithGoogle()
     → JWT Token (30-day expiry)
     → Middleware checks → Protected routes
     → Axios interceptor attaches token → API calls
```

- **Providers:** Credentials (email/password + optional 2FA), Google OAuth
- **Strategy:** JWT with 30-day max age
- **Middleware:** Chains next-intl + NextAuth, protects all routes except auth pages

---

## Internationalization

- **Locales:** English (`en`), Arabic (`ar`)
- **Direction:** LTR (English), RTL (Arabic)
- **Message files:** `messages/en.json` (370KB), `messages/ar.json` (449KB)
- **Calendar:** Gregorian + Hijri (moment-hijri)
- **Routing:** Pathname-based (`/en/crm/...`, `/ar/crm/...`)

---

## Routing Structure

```
/[locale]/
├── auth/
│   ├── sign-in
│   ├── sign-up
│   ├── otp
│   └── forgot-password
├── crm/
│   ├── dashboard
│   ├── products / customers / leads / ...
│   └── {feature}/[id] / [id]/edit / create
├── fms/
│   ├── financial-dashboard
│   ├── coa / journal-entry / payments / ...
│   └── {feature}/[id] / [id]/edit / create
├── scm/
│   ├── scm-dashboard
│   ├── products / suppliers / purchase-orders / ...
│   └── {feature}/[id] / [id]/edit / create
├── hrms/
│   ├── dashboard
│   ├── employees / attendances / payroll / ...
│   └── {feature}/[id] / [id]/edit / create
└── users/
    ├── roles / permissions / logs
    └── [id] / [id]/edit / create
```

---

## Shared Packages

### isomorphic-core

- **30+ custom hooks** — useTable, useDrawer, useFilterControl, useDirection, etc.
- **UI components** — Avatar, Breadcrumb, Datepicker, Pagination, FileUpload, PhoneInput
- **Feature components** — Charts, Icons, Google Map, Invoice Builder, DND Sortable, Image Viewer

### config-tailwind

- CSS variable-based theming (primary, secondary, red, orange, blue, green)
- 5 shade levels per color (lighter → darker)
- Dark mode support (class + attribute)
- Custom animations (blink, scale-up, skeleton, spinner)

### config-typescript

- Shared TypeScript configs: `base.json`, `nextjs.json`, `react-library.json`

---

## Development Workflow

```bash
# Dev (all apps)
pnpm dev

# Dev (specific app)
pnpm intl:dev          # isomorphic-intl
pnpm fm:dev            # esap-fms

# Build
pnpm build             # Build all via Turbo

# Lint & Format
pnpm lint              # ESLint all packages

# Clean
pnpm clean             # Remove build artifacts
```

- **Pre-commit:** Husky + lint-staged (auto-fix ESLint + Prettier)
- **Node:** >=22 required
- **Package manager:** pnpm 9.15.3

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXTAUTH_SECRET` | NextAuth JWT secret |
| `NEXTAUTH_URL` | NextAuth base URL |
| `NEXT_PUBLIC_REST_API_ENDPOINT` | Default API endpoint |
| `NEXT_PUBLIC_REST_API_ENDPOINT_FMS` | FMS API endpoint |
| `NEXT_PUBLIC_REST_API_ENDPOINT_HRMS` | HRMS API endpoint |
| `NEXT_PUBLIC_REST_API_ENDPOINT_CRM` | CRM API endpoint |
| `NEXT_PUBLIC_REST_API_ENDPOINT_SCM` | SCM API endpoint |
| `NEXT_PUBLIC_GOOGLE_MAP_API_KEY` | Google Maps API key |

---

## Project Scale

| Metric | Count |
|---|---|
| **Major modules** | 4 (CRM, FMS, SCM, HRMS) |
| **Next.js apps** | 2 |
| **Shared packages** | 3 |
| **API endpoints** | 300+ |
| **Custom hooks** | 100+ |
| **TypeScript types** | 85+ |
| **Zod validators** | 48+ |
| **Languages** | 2 (EN, AR) |
| **Route pages** | 300+ |
