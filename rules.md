# 📏 Project Rules

> **Mandatory rules for all contributors and AI coding assistants.**
> Every code change, commit, and review must comply with these rules.
> If a rule conflicts with a user's explicit instruction, follow the user's instruction and note the deviation.

---

## Table of Contents

- [1. Coding Standards](#1-coding-standards)
- [2. Folder Structure](#2-folder-structure)
- [3. Naming Conventions](#3-naming-conventions)
- [4. UI/UX Consistency](#4-uiux-consistency)
- [5. Git Commit Rules](#5-git-commit-rules)
- [6. Security & Environment Variables](#6-security--environment-variables)
- [7. Preservation & Safety](#7-preservation--safety)
- [8. AI Assistant Conduct](#8-ai-assistant-conduct)

---

## 1. Coding Standards

### Language & Tooling

| Rule | Detail |
| ---- | ------ |
| Language | TypeScript (strict mode). No `any` unless explicitly justified with a `// eslint-disable-next-line` comment. |
| Framework | React 19 with functional components and hooks only. No class components. |
| Build | Vite 6. Do not introduce Webpack, Parcel, or other bundlers. |
| Linting | Run `npm run lint` (`tsc --noEmit`) before committing. Zero errors allowed. |
| Formatting | Use consistent indentation (2 spaces). No tabs. |

### Code Quality

- **No inline styles** — use Tailwind CSS utility classes exclusively.
- **No magic numbers** — extract constants with descriptive names.
- **No console.log in production code** — use proper error boundaries or toast notifications.
- **No dead code** — remove unused imports, variables, and components before committing.
- **Explicit return types** — all exported functions must have explicit TypeScript return types.
- **Prop interfaces** — every React component must define a `Props` interface (or inline type) for its props.
- **Immutable state updates** — always use spread operators or `.map()/.filter()` for state updates. Never mutate state directly.

### Dependencies

- **Minimise new dependencies** — justify every new `npm install` in a commit message or decision record.
- **Approved dependency list**: `react`, `react-dom`, `lucide-react`, `motion`, `@google/genai`, `express`, `dotenv`, `tailwindcss`, `@tailwindcss/vite`, `@vitejs/plugin-react`.
- **No UI component libraries** (Chakra, MUI, Ant Design) unless explicitly approved in `decisions.md`.

---

## 2. Folder Structure

```
genericMed/
├── public/
│   └── assets/            # Static images, icons, logos
├── src/
│   ├── components/
│   │   ├── AdminPortal/   # Admin-only views and widgets
│   │   ├── CustomerPortal/# Patient/customer marketplace views
│   │   ├── StorePortal/   # Pharmacy store owner views
│   │   ├── Auth/          # Authentication screens (login, register)
│   │   ├── Modals/        # All modal/dialog components
│   │   └── Header.tsx     # Global header (shared across portals)
│   ├── data/
│   │   └── mockData.ts    # All mock/seed data
│   ├── types/
│   │   └── index.ts       # All shared TypeScript interfaces & types
│   ├── hooks/             # Custom React hooks (create as needed)
│   ├── utils/             # Utility/helper functions (create as needed)
│   ├── services/          # API client functions (create as needed)
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # React DOM entry point
│   └── index.css          # Global styles and Tailwind imports
├── .env.example           # Environment variable template
├── decisions.md           # Architecture Decision Records
├── rules.md               # THIS FILE — project rules
├── memory.md              # Long-term project memory
├── changelog.md           # Chronological change history
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Folder Rules

| Rule | Detail |
| ---- | ------ |
| **Portal isolation** | Admin, Customer, and Store components live in their own directories. Do not mix portal-specific components. |
| **Shared components** | Components used across portals go in `src/components/` root (e.g., `Header.tsx`). |
| **One component per file** | Each `.tsx` file exports exactly one primary component. Helper sub-components may co-exist in the same file only if they are not exported. |
| **No nested component directories** | Keep the hierarchy flat within each portal folder. If a component grows complex, extract sub-components into the same directory. |
| **New directories** | Creating `hooks/`, `utils/`, or `services/` directories is allowed when the first file in that category is needed. Document in `changelog.md`. |

---

## 3. Naming Conventions

| Element | Convention | Example |
| ------- | ---------- | ------- |
| **Component files** | PascalCase `.tsx` | `GovernanceDashboard.tsx` |
| **Type/Interface files** | camelCase `.ts` | `types/index.ts` |
| **Data files** | camelCase `.ts` | `data/mockData.ts` |
| **Utility files** | camelCase `.ts` | `utils/formatCurrency.ts` |
| **Hook files** | camelCase, prefixed `use` | `hooks/useDebounce.ts` |
| **CSS files** | camelCase `.css` | `index.css` |
| **React components** | PascalCase | `CustomerMarketplace` |
| **Functions/variables** | camelCase | `handleAddToCart` |
| **Constants** | SCREAMING_SNAKE_CASE | `DEFAULT_USERS` |
| **TypeScript types** | PascalCase | `BioequivalentPair` |
| **Enums** | PascalCase (members too) | `PortalMode` |
| **Event handlers** | Prefix with `handle` (internal) or `on` (prop) | `handleCheckout`, `onAddToCart` |
| **Boolean props/variables** | Prefix with `is`, `has`, `should`, `can` | `isCartOpen`, `hasLicense` |
| **IDs (HTML/test)** | kebab-case | `id="cart-modal"` |

---

## 4. UI/UX Consistency

### Design System

| Token | Value |
| ----- | ----- |
| **Primary font** | `Plus Jakarta Sans` (weights: 400, 500, 600, 700, 800) |
| **Monospace font** | `JetBrains Mono` (weights: 400, 500, 600) |
| **Background** | `bg-[#f1f5f9]` (Slate 100) |
| **Text primary** | `text-slate-900` |
| **Text secondary** | `text-slate-500` |
| **Accent / success** | `emerald-400` through `emerald-800` |
| **Danger / error** | `rose-500` through `rose-700` |
| **Warning** | `amber-500` through `amber-700` |
| **Card style** | `rounded-2xl bg-white border border-slate-200` |
| **Toast banner** | `rounded-xl bg-slate-900 text-white shadow-2xl` |
| **Selection** | `selection:bg-emerald-100 selection:text-emerald-900` |

### UI Rules

- **Responsive first** — all layouts must work on mobile, tablet, and desktop.
- **Consistent border radius** — cards use `rounded-2xl`, buttons use `rounded-xl`, badges use `rounded-full`.
- **Micro-animations** — use `motion` (Framer Motion) for page transitions, modal entrances, and hover effects.
- **Icons** — use `lucide-react` exclusively. Do not mix icon libraries.
- **Loading states** — every async action must show a loading indicator (spinner or skeleton).
- **Empty states** — every list/table must have a meaningful empty state message.
- **Toast notifications** — use the existing `showToast()` pattern for user feedback. No `alert()` or `confirm()`.
- **Accessibility** — all interactive elements must have `aria-label` or visible label text. Use semantic HTML (`<main>`, `<nav>`, `<section>`).

---

## 5. Git Commit Rules

### Commit Message Format

```
<type>(<scope>): <short description>

[optional body]
[optional footer]
```

### Allowed Types

| Type | Use When |
| ---- | -------- |
| `feat` | Adding a new feature |
| `fix` | Fixing a bug |
| `refactor` | Code restructuring without changing behaviour |
| `style` | CSS/UI-only changes, formatting |
| `docs` | Documentation updates (including these `.md` files) |
| `chore` | Build config, dependency updates, tooling |
| `test` | Adding or updating tests |
| `perf` | Performance improvements |

### Allowed Scopes

`admin`, `customer`, `store`, `auth`, `modals`, `header`, `types`, `data`, `config`, `deps`, `ai`, `api`

### Examples

```
feat(customer): add medicine search with autocomplete
fix(admin): resolve price radar NaN when baseline is zero
refactor(types): extract CartItem to shared interface
docs(memory): update completed features list
chore(deps): upgrade tailwindcss to 4.1.15
```

### Branch Rules

- **Never commit directly to `main`** — use feature branches.
- **Branch naming**: `<type>/<short-description>` (e.g., `feat/cart-checkout`, `fix/anomaly-freeze`).
- **Keep commits atomic** — one logical change per commit.

---

## 6. Security & Environment Variables

### Environment Variables

| Variable | Purpose | Required |
| -------- | ------- | -------- |
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes (for AI features) |
| `APP_URL` | Deployed application URL | Yes (for production) |

### Security Rules

- **Never commit `.env` files** — `.gitignore` already excludes them. Verify before every push.
- **Never hardcode API keys, secrets, or passwords** in source code.
- **Always use `.env.example`** as the template — keep it updated when new variables are added.
- **Server-side only** for all API keys — never expose them to the client bundle.
- **Sanitise user input** — validate and escape all form inputs before processing.
- **No `eval()` or `dangerouslySetInnerHTML`** unless explicitly justified and documented in `decisions.md`.
- **CORS** — when adding backend routes, configure CORS to allow only the `APP_URL` origin.
- **HIPAA awareness** — this is a healthcare application. Never log or store patient PII in client-side code, localStorage, or console output.

---

## 7. Preservation & Safety

> ⚠️ **Critical: Never break existing functionality unless explicitly requested by the user.**

- **Do not remove or rename** existing components, types, or exports without confirming the change is intentional.
- **Do not change** mock data structures that would break existing component contracts.
- **Do not modify** `vite.config.ts`, `tsconfig.json`, or `package.json` scripts without documenting the change in `decisions.md`.
- **Backward compatibility** — new features must not break existing portal views.
- **Test after every change** — run `npm run lint` and manually verify the affected portal view.
- **Preserve all comments and docstrings** that are unrelated to your code changes.

---

## 8. AI Assistant Conduct

### Before Making Changes

- [ ] Read `memory.md` for current project state.
- [ ] Check `decisions.md` for prior architectural decisions.
- [ ] Review `rules.md` (this file) for constraints.
- [ ] Check `changelog.md` for recent changes that may conflict.

### While Making Changes

- [ ] Follow all naming conventions in Section 3.
- [ ] Follow the folder structure in Section 2.
- [ ] Use the design system tokens in Section 4.
- [ ] Write commit messages per Section 5.
- [ ] Never introduce security violations per Section 6.

### After Making Changes

- [ ] Update `memory.md` with any new features, endpoints, or schema changes.
- [ ] Update `changelog.md` with an entry describing what changed.
- [ ] Add a new entry to `decisions.md` if an architectural decision was made.
- [ ] Run `npm run lint` and fix any errors.
- [ ] Verify the UI renders correctly in the affected portal(s).
