# 📝 Changelog

> All notable changes to the **genericMed** project are documented in this file.
> Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/).
>
> AI assistants **must** append a new entry after every significant change.

---

## [Unreleased]

_Items staged for the next version release._

- Core backend data persistence (PostgreSQL + RLS)
- JWT authentication replacing mock auth
- Gemini AI integration for pharmacopoeia search and integrity scan
- Payment processing integration

### Added

- **Phase 1 API Foundation** — TypeScript Express server at `src/server/` with `npm run server` startup and an esbuild production bundle.
- **Health Check** — Public `GET /api/v1/health` endpoint with request correlation IDs.
- **API Security Middleware** — Restrictive CORS, Helmet headers, JSON body limits, and public rate limiting.
- **Validation & Observability** — Reusable Zod validation middleware and redacted structured Pino request logs.
- **Server Smoke Tests** — Native TypeScript tests for health status, CORS enforcement, and request validation.

---

## [0.2.0] — 2026-09-08

### Added

- **Authentication System** — Login and registration screens with role selection (admin, customer, store).
- **AuthScreen Component** — Full-featured modal auth screen at `src/components/Auth/AuthScreen.tsx`.
- **User Profile State** — `UserProfile` interface and `currentUser` state in `App.tsx`.
- **Role-Based Portal Routing** — Successful login automatically switches to the user's portal.
- **Logout Flow** — Clears session and re-opens the auth screen.
- **Default Users** — Mock `DEFAULT_USERS` object (admin, customer, store) in `mockData.ts`.

### Changed

- **Header** — Added user profile dropdown with login/logout actions.
- **Command Palette** — Added auth navigation option.
- **Customer Marketplace** — Gated actions behind authentication state.
- **Store Dashboard** — Gated access behind authentication state.

---

## [0.1.0] — 2026-09-08

### Added

- **Project Initialisation** — Vite + React + TypeScript scaffold.
- **Tailwind CSS v4** — Configured via `@tailwindcss/vite` plugin.
- **Plus Jakarta Sans & JetBrains Mono** — Google Fonts integration.
- **Multi-Portal Architecture** — `PortalMode` type with `admin` | `customer` | `store` modes.
- **Admin Portal**
  - Governance Dashboard with bioequivalence catalog.
  - Price Anomaly Radar with quarantine and enforce-cap actions.
  - Partner Verification with store onboarding workflow.
  - Orders & Fulfillment view.
  - Audit Logs with SHA-256 hashed entries.
  - Tenant Management view.
  - API & Rate Limits configuration view.
  - System & Governance Settings view.
  - Patient Review Moderation view.
  - Admin Sidebar with tabbed navigation and badge counts.
- **Customer Portal**
  - Customer Marketplace with medicine listing and price comparison.
  - Cart system with add, update quantity, and remove.
  - Checkout flow with savings calculation and order creation.
- **Store Portal**
  - Store Dashboard with inventory and fulfillment metrics.
- **Shared Components**
  - Header with portal switcher, RLS Inspector, Command Palette, and Integrity Scan triggers.
  - Command Palette (Ctrl+K) with global search.
  - Toast notification system.
  - Compliance export (JSON download).
- **Modal System**
  - BioStudy Modal — bioequivalence study details and approval.
  - Store Documents Modal — license and credential verification.
  - RLS Inspector Modal — Row-Level Security partition inspector.
  - Pharmacopoeia Modal — drug reference lookup.
  - Integrity Scan Modal — platform integrity audit.
  - Cart Modal — shopping cart management.
- **Type System** — Complete TypeScript interfaces in `src/types/index.ts`.
- **Mock Data** — Comprehensive seed data in `src/data/mockData.ts`.
- **SEO** — Meta tags, Open Graph, and Twitter Card support.
- **Environment Config** — `.env.example` with `GEMINI_API_KEY` and `APP_URL`.
- **Git Config** — `.gitignore` for `node_modules`, `dist`, `.env`, and logs.

---

## [0.0.0] — 2026-09-08

### Added

- Initial commit — empty repository scaffold.

---

## Entry Template

<!--
Copy this template when adding a new version entry.
Place it below [Unreleased] and above the previous version.

## [X.Y.Z] — YYYY-MM-DD

### Added
- New features.

### Changed
- Changes to existing functionality.

### Fixed
- Bug fixes.

### Removed
- Removed features or deprecated items.

### Security
- Vulnerability patches or security improvements.

### Deprecated
- Features that will be removed in a future version.
-->
