# 📋 Architecture Decision Record (ADR)

> Every important technical and product decision is documented here.
> AI assistants **must** consult this file before proposing architectural changes and **must** append a new entry for every decision they make or recommend.

---

## Decision Log

| #   | Title                                      | Date       | Status     |
| --- | ------------------------------------------ | ---------- | ---------- |
| 001 | Use React + Vite + TypeScript              | 2026-09-08 | ✅ Accepted |
| 002 | Tailwind CSS v4 for styling                | 2026-09-08 | ✅ Accepted |
| 003 | Multi-portal architecture (Admin/Customer/Store) | 2026-09-08 | ✅ Accepted |
| 004 | Mock data layer for initial prototype      | 2026-09-08 | ✅ Accepted |
| 005 | Gemini AI integration via server-side API  | 2026-09-08 | ✅ Accepted |
| 006 | Client-side authentication with role-based routing | 2026-09-08 | ✅ Accepted |
| 007 | Secure TypeScript Express API foundation | 2026-09-08 | ✅ Accepted |

---

## ADR-001: Use React + Vite + TypeScript

| Field                  | Detail                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Date**               | 2026-09-08                                                                                     |
| **Status**             | ✅ Accepted                                                                                     |
| **Context / Problem**  | Need a modern, fast-building SPA framework for a data-heavy pharmaceutical governance platform. |
| **Decision**           | Use React 19 with Vite 6 as the build tool and TypeScript 5.8 for type safety.                 |
| **Reasoning**          | Vite offers near-instant HMR; React 19 provides concurrent features; TypeScript catches domain-model errors at compile time in a safety-critical healthcare app. |
| **Alternatives**       | Next.js (SSR overhead unnecessary for initial prototype), Angular (steeper learning curve), plain JS (no type safety for medical domain models). |
| **Impact**             | All source files are `.tsx`/`.ts`. Build via `vite build`. Dev server on port 3000.             |

---

## ADR-002: Tailwind CSS v4 for Styling

| Field                  | Detail                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Date**               | 2026-09-08                                                                                     |
| **Status**             | ✅ Accepted                                                                                     |
| **Context / Problem**  | Need rapid, consistent UI development with a utility-first approach.                           |
| **Decision**           | Use Tailwind CSS v4 via the `@tailwindcss/vite` plugin.                                        |
| **Reasoning**          | Tight Vite integration, no PostCSS config needed, JIT compilation, and design consistency across all three portals. |
| **Alternatives**       | Vanilla CSS (slower iteration), CSS Modules (less utility-based), Chakra/MUI (too opinionated for custom pharma UI). |
| **Impact**             | All component styling uses Tailwind utility classes. Custom design tokens live in `src/index.css`. Font: Plus Jakarta Sans + JetBrains Mono. |

---

## ADR-003: Multi-Portal Architecture (Admin / Customer / Store)

| Field                  | Detail                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Date**               | 2026-09-08                                                                                     |
| **Status**             | ✅ Accepted                                                                                     |
| **Context / Problem**  | Three distinct user roles (platform admin, patient/customer, pharmacy store owner) require different interfaces and data access. |
| **Decision**           | Single SPA with a `PortalMode` state (`admin` \| `customer` \| `store`) driving conditional rendering of portal-specific components. |
| **Reasoning**          | Simplifies deployment to one bundle; shared Header, modals, and auth screen; portal switching is instant without page reloads. |
| **Alternatives**       | Separate SPAs per role (deployment complexity), micro-frontends (premature for prototype), route-based split (insufficient isolation). |
| **Impact**             | Components organised under `src/components/AdminPortal/`, `CustomerPortal/`, `StorePortal/`. Portal switch via Header dropdown. |

---

## ADR-004: Mock Data Layer for Initial Prototype

| Field                  | Detail                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Date**               | 2026-09-08                                                                                     |
| **Status**             | ✅ Accepted                                                                                     |
| **Context / Problem**  | Need realistic demo data for bioequivalence pairs, price anomalies, stores, and orders before backend exists. |
| **Decision**           | Use `src/data/mockData.ts` with typed arrays matching production interfaces.                   |
| **Reasoning**          | Enables frontend-first development; type-safe mock data ensures seamless swap to real API later. |
| **Alternatives**       | JSON files (no type checking), MSW service worker (premature), hardcoded inline data (unmaintainable). |
| **Impact**             | All mock data exported from one file. When backend is ready, replace imports with API fetch calls. |

---

## ADR-005: Gemini AI Integration via Server-Side API

| Field                  | Detail                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Date**               | 2026-09-08                                                                                     |
| **Status**             | ✅ Accepted                                                                                     |
| **Context / Problem**  | AI-powered features (pharmacopoeia search, integrity scans) need LLM access without exposing API keys to the client. |
| **Decision**           | Use `@google/genai` SDK with a server-side Express proxy. API key stored in `GEMINI_API_KEY` env var. |
| **Reasoning**          | Server-side keeps the key secure; Express can add rate limiting and input validation before forwarding to Gemini. |
| **Alternatives**       | Client-side SDK (key exposure risk), OpenAI (not aligned with existing Google Cloud infra), no AI (reduces product value). |
| **Impact**             | Requires `GEMINI_API_KEY` in `.env`. Express server must be running for AI features. See `.env.example`. |

---

## ADR-006: Client-Side Authentication with Role-Based Routing

| Field                  | Detail                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Date**               | 2026-09-08                                                                                     |
| **Status**             | ✅ Accepted                                                                                     |
| **Context / Problem**  | Users need to log in and be routed to the correct portal based on their role.                  |
| **Decision**           | Client-side auth state with `UserProfile` type, role-based portal switching, and `AuthScreen` modal for login/registration. |
| **Reasoning**          | Sufficient for prototype phase; mock `DEFAULT_USERS` enable quick role switching for demos. Backend auth (JWT/OAuth) planned for production. |
| **Alternatives**       | Firebase Auth (dependency overhead for prototype), server-side sessions (backend not ready), no auth (can't demonstrate role separation). |
| **Impact**             | `AuthScreen` component handles login/register flows. `currentUser` state drives portal access. Must be replaced with real auth before production. |

---

## ADR-007: Secure TypeScript Express API Foundation

| Field                  | Detail |
| ---------------------- | ------ |
| **Date**               | 2026-09-08 |
| **Status**             | ✅ Accepted |
| **Context / Problem**  | Phase 1 needs a runnable backend before persistence and authentication can be added. The frontend package already contains Express, `tsx`, and esbuild but has no API entry point, security middleware, validation, or structured logging. |
| **Decision**           | Place the API under `src/server/`. Run it locally with `npm run server`, bundle it with esbuild via `npm run server:build`, and run the bundle with `npm run server:start`. Use `cors`, `helmet`, `express-rate-limit`, Zod, Pino, and `pino-http` for the API boundary. |
| **Reasoning**          | This keeps the frontend and backend in one TypeScript repository while providing a small, explicit security baseline: restrictive CORS, security headers, request-size limits, public rate limiting, validated request contracts, correlation IDs, and redacted JSON logs. These focused dependencies directly meet Phase 1 Milestone 1.1 requirements without introducing a framework or UI library. |
| **Alternatives**       | A separate server repository or framework (NestJS/Fastify) would add deployment and migration overhead; handwritten validation/logging would be less robust; deferring the middleware would leave the API unsafe to extend. |
| **Impact**             | `GET /api/v1/health` is the first live endpoint. Production requires `APP_URL`; rate limiting is in-memory until a later shared-store infrastructure decision. Database/ORM selection remains intentionally deferred to Milestone 1.2. |

---

## Template for New Decisions

<!--
Copy this template when adding a new decision.
Place it above this comment block.

## ADR-NNN: [Decision Title]

| Field                  | Detail     |
| ---------------------- | ---------- |
| **Date**               | YYYY-MM-DD |
| **Status**             | 🟡 Proposed / ✅ Accepted / ❌ Rejected / 🔄 Superseded by ADR-XXX |
| **Context / Problem**  |            |
| **Decision**           |            |
| **Reasoning**          |            |
| **Alternatives**       |            |
| **Impact**             |            |

Then update the Decision Log table at the top of this file.
-->
