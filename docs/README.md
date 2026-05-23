# Cosmic UI Documentation

Cosmic UI is a monorepo for an AI-powered React component platform. It includes a **client app** (login & product UI), an **Express API** (auth & users), and a **publishable React component library** with a soft-minimal design system.

## Documentation index

| Document                                | Description                                |
| --------------------------------------- | ------------------------------------------ |
| [Getting started](./getting-started.md) | Install, configure, and run all packages   |
| [Architecture](./architecture.md)       | Monorepo layout, tech stack, and data flow |
| [Design system](./design-system.md)     | Colors, typography, tokens, and motion     |
| [Client app](./client.md)               | React app structure, routes, and features  |
| [Server API](./server.md)               | Express backend, database, and environment |
| [API reference](./api-reference.md)     | HTTP endpoints and payloads                |
| [Authentication](./authentication.md)   | Google OAuth, JWT, and Redux auth flow     |
| [Component library](./library.md)       | `cosmic-ui-library` package and components |
| [Development](./development.md)         | Linting, formatting, commits, and tooling  |

## Repository structure

```
Cosmic UI/
├── client/          # React 19 + Vite frontend
├── server/          # Express 5 + MongoDB API
├── library/         # cosmic-ui-library (React components)
├── docs/            # Project documentation (this folder)
├── .husky/          # Git hooks (lint-staged, commitlint)
└── package.json     # Root lint/format scripts
```

## Tech stack at a glance

| Layer       | Technologies                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| **Client**  | React 19, Vite 8, Redux Toolkit, React Router 6, Tailwind CSS 4, Firebase Auth, Framer Motion, Axios |
| **Server**  | Express 5, Mongoose, JWT, cookie-parser, CORS, dotenv                                                |
| **Library** | React (peer), tsup (ESM + CJS build)                                                                 |
| **Tooling** | ESLint 9, Prettier, Husky, lint-staged, Commitlint                                                   |

## Quick start

```bash
# Root — install dev tooling
npm install

# Server
cd server && npm install
# Create .env (see docs/server.md), then:
npm run dev

# Client (separate terminal)
cd client && npm install
cp .env.example .env.local   # fill in values
npm run dev

# Library (optional — build package)
cd library && npm install && npm run build
```

- **Client:** http://localhost:5173
- **Server:** configured via `PORT` in server `.env` (commonly `5000`)

## Related docs in the repo

- Full design guide: [`client/src/Design/design.md`](../client/src/Design/design.md)
- Auth feature notes: [`client/src/features/auth/README.md`](../client/src/features/auth/README.md)
- Client setup notes: [`client/SETUP_COMPLETE.md`](../client/SETUP_COMPLETE.md)

## Project status notes

Documentation reflects the **current codebase**. A few areas are in progress:

- `App.jsx` exists but `main.jsx` mounts routes directly (login only).
- A dashboard route is described in setup notes but is not implemented yet.
- Client and server auth payloads are not fully aligned (see [Authentication](./authentication.md)).

---

_Generated from codebase analysis — May 2026_
