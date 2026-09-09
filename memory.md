# 🧠 Project Memory

> **Long-term project context for AI coding assistants.**
> This file is the single source of truth for the current state of the genericMed project.
> Update this file after every significant change.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features Completed](#features-completed)
- [Pending Features](#pending-features)
- [Application Architecture](#application-architecture)
- [API Endpoints](#api-endpoints)
- [Database Schema Summary](#database-schema-summary)
- [Important Business Logic](#important-business-logic)
- [Known Issues](#known-issues)
- [Future Roadmap](#future-roadmap)

---

## Project Overview

| Field | Detail |
| ----- | ------ |
| **Project Name** | genericMed |
| **Tagline** | Generic Medicine Platform |
| **Description** | Online generic medicine price comparison, bioequivalence governance, and multi-tenant pharmacy commerce platform. |
| **Domain** | HealthTech / Pharmaceutical Commerce |
| **Target Users** | Platform admins (governance), patients/customers (marketplace), pharmacy store owners (inventory & fulfillment). |
| **Current Phase** | Phase 1 — Backend & Data Layer (Milestone 1.1 complete) |
| **Repository** | `d:\projects\genericMed` |
| **Dev Server** | `http://localhost:3000` |
| **Last Updated** | 2026-09-08 |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
| ---------- | ------- | ------- |
| React | 19.0.1 | UI framework |
| TypeScript | ~5.8.2 | Type safety |
| Vite | 6.2.3 | Build tool & dev server |
| Tailwind CSS | 4.1.14 | Utility-first styling |
| Framer Motion (`motion`) | 12.23.24 | Animations & transitions |
| Lucide React | 0.546.0 | Icon library |

### Backend (Planned / Partial)

| Technology | Version | Purpose |
| ---------- | ------- | ------- |
| Express | 4.21.2 | API server (configured, not fully implemented) |
| dotenv | 17.2.3 | Environment variable loading |
| @google/genai | 2.4.0 | Gemini AI SDK for server-side AI features |

### DevDependencies

| Technology | Version | Purpose |
| ---------- | ------- | ------- |
| esbuild | 0.25.0 | Server-side bundling |
| tsx | 4.21.0 | TypeScript execution for scripts |
| autoprefixer | 10.4.21 | CSS vendor prefixing |

### Fonts

- **Primary**: Plus Jakarta Sans (400, 500, 600, 700, 800)
- **Monospace**: JetBrains Mono (400, 500, 600)

---

## Features Completed

### ✅ Admin Portal

- [x] **Governance Dashboard** — Overview of bioequivalence pairs, anomalies, stores, and audit logs
- [x] **Bioequivalence Catalog** — View, approve, and manage FDA/EMA bioequivalence signoffs
- [x] **Price Anomaly Radar** — Detect, quarantine, and resolve price anomalies (flash dumps, margin spikes, suppressed search)
- [x] **Partner Verification** — Onboard and verify pharmacy stores with license/credential checks
- [x] **Orders & Fulfillment** — View and track all platform orders across tenants
- [x] **Audit Logs** — Immutable chronological log of all governance actions (SHA-256 hashed)
- [x] **Tenant Management** — Multi-tenant configuration and RLS partition management
- [x] **API & Rate Limits** — Rate limiting configuration view (10K req/min public, 500 req/min per tenant)
- [x] **System Settings** — Governance thresholds, FDA Orange Book sync, HIPAA retention rules
- [x] **Patient Review Moderation** — Review integrity verification (sentiment index)
- [x] **Admin Sidebar** — Tabbed navigation with badge counts for pending items

### ✅ Customer Portal

- [x] **Customer Marketplace** — Browse generic medicines with price comparison across pharmacies
- [x] **Cart System** — Add to cart, update quantities, remove items
- [x] **Checkout Flow** — Place orders with delivery address, tracking number, savings calculation
- [x] **Medicine Details** — View indications, side effects, intake guide, bioequivalence match score

### ✅ Store Portal

- [x] **Store Dashboard** — Pharmacy owner dashboard with inventory and fulfillment metrics

### ✅ Shared / Global

- [x] **Multi-Portal Header** — Portal switcher (Admin/Customer/Store), RLS Inspector trigger, Command Palette trigger, Integrity Scan trigger, user profile dropdown
- [x] **Authentication** — Login and registration screens with role selection (admin, customer, store)
- [x] **Command Palette** — Ctrl+K global search across bioequivalence pairs, anomalies, stores, and navigation
- [x] **Toast Notifications** — Non-blocking toast banners for all user actions
- [x] **Compliance Export** — Download full regulatory compliance trail as JSON

### ✅ Modals

- [x] **BioStudy Modal** — Detailed bioequivalence study view with approval action
- [x] **Store Documents Modal** — Pharmacy license, credentials, and authorization view
- [x] **RLS Inspector Modal** — Row-Level Security partition inspector
- [x] **Command Palette Modal** — Global search and navigation
- [x] **Pharmacopoeia Modal** — Pharmacopoeia reference lookup
- [x] **Integrity Scan Modal** — Platform integrity audit scan

### ✅ Backend Foundation (Phase 1, Milestone 1.1)

- [x] **TypeScript Express API** — Runnable server at `src/server/` with `npm run server`
- [x] **Health Endpoint** — `GET /api/v1/health` with a correlated request ID
- [x] **API Security Baseline** — Restrictive CORS, Helmet security headers, body-size limits, and public rate limiting
- [x] **Request Validation & Logging** — Zod validation middleware and redacted Pino request logs
- [x] **Server Build & Smoke Tests** — esbuild bundle script plus health/CORS validation tests

---

## Pending Features

### 🔲 High Priority

- [ ] **Backend API Implementation** — Replace mock data with real Express API endpoints
- [ ] **Database Integration** — PostgreSQL with RLS for multi-tenant data isolation
- [ ] **Real Authentication** — JWT/OAuth2 authentication replacing client-side mock auth
- [ ] **Gemini AI Integration** — Wire up pharmacopoeia search, integrity scan, and AI-assisted diagnosis
- [ ] **Payment Processing** — Integration with payment gateway for order checkout

### 🔲 Medium Priority

- [ ] **Real-time Notifications** — WebSocket-based live updates for order status and anomaly alerts
- [ ] **Advanced Search & Filters** — Elastic/Algolia-powered medicine search with faceted filters
- [ ] **Store Inventory Management** — Full CRUD for pharmacy inventory with bulk import
- [ ] **Prescription Upload** — Patient prescription image upload and OCR processing
- [ ] **Order Tracking** — Real-time delivery tracking with map integration

### 🔲 Low Priority

- [ ] **Analytics Dashboard** — Admin analytics with charts (revenue, orders, user growth)
- [ ] **Multi-language Support** — i18n for Hindi, Tamil, Telugu, and other regional languages
- [ ] **Mobile App** — React Native or PWA version
- [ ] **Email/SMS Notifications** — Transactional email and SMS for order updates
- [ ] **Review System** — Patient reviews and ratings for pharmacies and medicines

---

## Application Architecture

### Portal Modes

The app uses a single-SPA architecture with three portal modes controlled by the `PortalMode` type:

```typescript
type PortalMode = 'admin' | 'customer' | 'store';
```

### Component Hierarchy

```
App.tsx
├── Header (shared)
├── AdminSidebar (admin mode only)
├── Main Content Area
│   ├── [admin]    → GovernanceDashboard / PriceAnomalyRadarView / PartnerVerificationView / ...
│   ├── [customer] → CustomerMarketplace
│   └── [store]    → StoreDashboard
├── Modals
│   ├── BioStudyModal
│   ├── StoreDocsModal
│   ├── RLSInspectorModal
│   ├── CommandPalette
│   ├── PharmacopeiaModal
│   ├── IntegrityScanModal
│   └── CartModal
└── AuthScreen
```

### State Management

- **No external state library** — all state managed via React `useState` in `App.tsx`.
- Portal state, cart state, modal visibility, auth state, and notification state all live in the root component.
- If complexity grows, consider adding Zustand or React Context (document in `decisions.md`).

---

## API Endpoints

> ⚠️ **Backend foundation is implemented; domain persistence and feature endpoints remain pending.** The health endpoint is live. The following endpoints are planned for subsequent Phase 1 milestones.

### Planned REST API (`/api/v1/`)

| Method | Endpoint | Description | Auth |
| ------ | -------- | ----------- | ---- |
| `GET` | `/api/v1/health` | API health and deployment status | Public |
| `POST` | `/api/v1/auth/login` | User authentication | Public |
| `POST` | `/api/v1/auth/register` | User registration | Public |
| `GET` | `/api/v1/medicines` | List all generic medicines | Public |
| `GET` | `/api/v1/medicines/:id` | Get medicine details with pharmacy listings | Public |
| `GET` | `/api/v1/bioequivalence` | List bioequivalence pairs | Admin |
| `PATCH` | `/api/v1/bioequivalence/:id/approve` | Approve a bioequivalence signoff | Admin |
| `GET` | `/api/v1/anomalies` | List price anomalies | Admin |
| `PATCH` | `/api/v1/anomalies/:id/quarantine` | Toggle quarantine status | Admin |
| `PATCH` | `/api/v1/anomalies/:id/enforce-cap` | Enforce regional price cap | Admin |
| `GET` | `/api/v1/stores` | List pharmacy stores | Admin |
| `PATCH` | `/api/v1/stores/:id/authorize` | Authorize a store as Tier 1 Partner | Admin |
| `GET` | `/api/v1/orders` | List orders (filtered by tenant for stores) | Admin/Store |
| `POST` | `/api/v1/orders` | Place a new order | Customer |
| `GET` | `/api/v1/audit-logs` | List audit trail entries | Admin |
| `POST` | `/api/v1/ai/pharmacopoeia` | AI-powered pharmacopoeia search | Admin |
| `POST` | `/api/v1/ai/integrity-scan` | AI-powered integrity scan | Admin |

### Environment Variables

```bash
GEMINI_API_KEY="..."   # Required for AI features
APP_URL="..."          # Deployed application URL
PORT="4000"            # Express API port
LOG_LEVEL="info"       # Pino log level
```

---

## Database Schema Summary

> ⚠️ **Database not yet implemented.** The following schemas are derived from the existing TypeScript interfaces and represent the planned data model.

### `users`

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | UUID (PK) | |
| `name` | VARCHAR(255) | |
| `email` | VARCHAR(255) | Unique |
| `role` | ENUM(`admin`, `customer`, `store`) | |
| `role_title` | VARCHAR(100) | |
| `phone` | VARCHAR(20) | Nullable |
| `tenant_id` | UUID (FK → stores) | Nullable, for store users |
| `license_number` | VARCHAR(50) | Nullable |
| `npi_number` | VARCHAR(20) | Nullable |
| `address` | TEXT | Nullable |
| `joined_date` | TIMESTAMP | |

### `bioequivalence_pairs`

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | UUID (PK) | |
| `category` | ENUM(`Cardiovascular`, `Antibiotics`, `Antidiabetics`, `Analgesics`, `Gastrointestinal`) | |
| `branded_name` | VARCHAR(255) | |
| `generic_name` | VARCHAR(255) | |
| `active_moiety` | VARCHAR(255) | |
| `bio_study_id` | VARCHAR(50) | |
| `study_organization` | ENUM(`FDA`, `EMA`, `CDSCO`) | |
| `bioequivalence_match` | DECIMAL(5,2) | Percentage |
| `state` | ENUM(`Pending Board`, `Verified & Active`, `Quarantined`) | |
| `savings_percent` | DECIMAL(5,2) | |

### `price_anomalies`

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | UUID (PK) | |
| `store_id` | UUID (FK → stores) | |
| `medicine_name` | VARCHAR(255) | |
| `listed_price` | DECIMAL(10,2) | |
| `baseline_price` | DECIMAL(10,2) | |
| `type` | ENUM(`FLASH_DUMP`, `SUPPRESSED_SEARCH`, `MARGIN_SPIKE`) | |
| `variance_percent` | DECIMAL(5,2) | |
| `status` | ENUM(`ACTIVE_TELEMETRY`, `QUARANTINED`, `RESOLVED`) | |

### `stores`

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | UUID (PK) | |
| `store_name` | VARCHAR(255) | |
| `license_number` | VARCHAR(50) | |
| `status` | ENUM(`Awaiting Verification`, `Tier 1 Partner`, `Suspended`) | |
| `tenant_id` | VARCHAR(50) | Unique — RLS partition key |
| `cluster` | VARCHAR(100) | Geographic cluster |
| `delivery_sla` | INTEGER | Minutes |
| `fulfillment_rate` | DECIMAL(5,2) | Percentage |

### `orders`

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | UUID (PK) | |
| `customer_id` | UUID (FK → users) | |
| `tenant_id` | UUID (FK → stores) | RLS-scoped |
| `status` | ENUM(`ORDER_PLACED`, `VERIFIED_RLS`, `STORE_DISPATCHED`, `DELIVERED`) | |
| `total` | DECIMAL(10,2) | |
| `savings_total` | DECIMAL(10,2) | |
| `tracking_number` | VARCHAR(50) | |
| `estimated_delivery` | VARCHAR(100) | |
| `placed_at` | TIMESTAMP | |

### `audit_logs`

| Column | Type | Notes |
| ------ | ---- | ----- |
| `id` | UUID (PK) | |
| `timestamp` | TIMESTAMP | |
| `type` | ENUM(`SIGNOFF`, `AUTO-QUARANTINE`, `SECURITY`, `TELEMETRY`, `PAYMENT`, `RLS_ENFORCEMENT`) | |
| `actor` | VARCHAR(255) | |
| `summary` | TEXT | |
| `detail` | TEXT | |
| `sha256_hash` | CHAR(64) | Immutable integrity hash |

---

## Important Business Logic

### Bioequivalence Governance

- **Approval workflow**: Pairs start as `Pending Board` → reviewer approves → state becomes `Verified & Active`.
- **Board signoff** generates an audit log entry of type `SIGNOFF` with SHA-256 hash.
- **Confidence interval**: AUC/Cmax ratio must be within 90% CI for FDA compliance (21 CFR 320).
- Study organizations: `FDA`, `EMA`, `CDSCO`.

### Price Anomaly Detection

- **Variance threshold**: ±35% from regional weighted median triggers an anomaly alert.
- **Anomaly types**:
  - `FLASH_DUMP` — price significantly below baseline (predatory pricing).
  - `MARGIN_SPIKE` — price significantly above baseline (gouging).
  - `SUPPRESSED_SEARCH` — listing hidden from marketplace search.
- **Actions**: Quarantine (freeze listing) or Enforce Cap (force price to baseline).
- Both actions generate audit log entries.

### Multi-Tenant Architecture

- Each pharmacy store is a **tenant** with a unique `tenantId`.
- **Row-Level Security (RLS)** planned for PostgreSQL — stores can only see their own data.
- JWT tokens will encode `tenantId` for API-level enforcement.
- Rate limiting: 500 req/min per tenant, 10K req/min public marketplace.

### Cart & Checkout

- Cart supports multiple items from different pharmacies.
- **Savings calculation**: `(msrpPrice - listingPrice) × quantity` per item.
- Delivery fee: flat $1.99 (hardcoded; make configurable in backend).
- Checkout creates an order with status `PREPARING` and a tracking number.
- Orders appear in the Admin Orders & Fulfillment view.

### Authentication

- Currently mock-based with `DEFAULT_USERS` (admin, customer, store).
- Login sets `currentUser` and switches `PortalMode` to match user role.
- Logout clears `currentUser` and opens the auth screen.

---

## Known Issues

| # | Severity | Description | Affected Area |
| - | -------- | ----------- | ------------- |
| 1 | 🟡 Medium | API foundation is live, but domain data is still mock-backed and resets on page reload | Entire app |
| 2 | 🟡 Medium | Auth is client-side only — no real security, tokens, or session management | Auth |
| 3 | 🟢 Low | Delivery fee is hardcoded at $1.99 — should be configurable | Customer Portal |
| 4 | 🟢 Low | Customer name is hardcoded as "Patient User" in checkout | Customer Portal |
| 5 | 🟢 Low | Delivery address is hardcoded in checkout (not from user profile) | Customer Portal |
| 6 | 🟢 Low | `package.json` name is `react-example` — should be `genericmed` | Config |
| 7 | 🟢 Low | `clean` script uses Unix `rm -rf` — may fail on Windows | Config |

---

## Future Roadmap

### Phase 1: Backend Foundation (Next)

- [ ] Set up Express API with TypeScript
- [ ] PostgreSQL database with RLS policies
- [ ] JWT authentication (login, register, refresh)
- [ ] Migrate mock data to seeded database
- [ ] Wire frontend to real API endpoints

### Phase 2: AI & Intelligence

- [ ] Gemini AI pharmacopoeia search
- [ ] AI-powered integrity scanning
- [ ] Drug interaction warnings
- [ ] Intelligent price anomaly detection (ML-based)

### Phase 3: Commerce & Payments

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Prescription upload & verification
- [ ] Real-time order tracking
- [ ] Store inventory management CRUD

### Phase 4: Scale & Polish

- [ ] Real-time WebSocket notifications
- [ ] Advanced search (Elasticsearch/Algolia)
- [ ] Analytics dashboard with charts
- [ ] Multi-language support (i18n)
- [ ] PWA / mobile app
- [ ] HIPAA compliance audit & certification
