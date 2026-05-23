# Development guide

Standards and tooling for contributing to the Cosmic UI monorepo.

## Repository layout

| Path       | Role                                           |
| ---------- | ---------------------------------------------- |
| `/`        | Shared ESLint, Prettier, Husky, Commitlint     |
| `/client`  | Frontend app (own `package.json`, Vite ESLint) |
| `/server`  | Backend API                                    |
| `/library` | Component package build                        |
| `/docs`    | Project documentation                          |

Each package is installed independently (`npm install` per folder).

## Linting

**Root** `eslint.config.js` — monorepo-wide rules:

- `@eslint/js` recommended
- `eslint-plugin-react`, `react-hooks`, `react-refresh`
- `eslint-plugin-import`, `jsx-a11y`, `promise`, `n`
- `eslint-config-prettier` (disable conflicting formatting rules)

**Commands (root):**

```bash
npm run lint
npm run lint:fix
```

**Client** also has `client/eslint.config.js` for app-specific lint during `npm run dev` / `npm run lint`.

## Formatting

**Prettier** (root):

- Config: `.prettierrc`, ignore: `.prettierignore`
- Tailwind class sorting: `prettier-plugin-tailwindcss`

```bash
npm run format        # write
npm run format:check  # CI-style check
```

## Git hooks (Husky)

Installed via root `prepare` script: `husky || true`.

### Pre-commit (`.husky/pre-commit`)

Runs **lint-staged** on staged files.

**lint-staged** (root `package.json`):

| Glob                                 | Actions                                             |
| ------------------------------------ | --------------------------------------------------- |
| `*.{js,jsx}`                         | `eslint --fix --max-warnings=0`, `prettier --write` |
| `*.{css,scss,json,html,md,yaml,yml}` | `prettier --write`                                  |

### Commit message (`.husky/commit-msg`)

**Commitlint** with `@commitlint/config-conventional`.

Valid types include: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, etc.

**Examples:**

```
feat(client): add dashboard route
fix(server): verify firebase id token
docs: add api reference for auth endpoints
```

Config: `commitlint.config.js` at repo root.

## Editor config

`.editorconfig` — consistent indentation and line endings across editors.

## Code conventions

### JavaScript / React

- ES modules (`"type": "module"` in package.json files)
- Functional components + hooks
- Feature folders under `client/src/features/<name>/`
- Redux Toolkit slices for shared client state

### Naming

| Item             | Convention                            |
| ---------------- | ------------------------------------- |
| React components | PascalCase `.jsx`                     |
| Hooks            | `use` prefix camelCase                |
| Redux slices     | `*.slice.js`                          |
| API routes       | kebab or lowercase paths under `/api` |

### CSS / styling (client)

- Prefer Tailwind utilities tied to `@theme` tokens
- Design tokens in `client/src/app/index.css`
- Full spec in `client/src/Design/design.md`

### Server

- Controllers in `controllers/`, thin route files
- Mongoose models in `models/`
- Config helpers in `config/`

## Running everything locally

**Terminal 1 — Server:**

```bash
cd server && npm run dev
```

**Terminal 2 — Client:**

```bash
cd client && npm run dev
```

**Optional — Library watch/rebuild:**

```bash
cd library && npm run build
```

## Testing

No test runner is configured at the root or in packages yet (`npm test` at root exits with placeholder).

Suggested additions:

- **Client:** Vitest + React Testing Library
- **Server:** Vitest or Node test runner + supertest
- **Library:** Component snapshot / render tests

## Adding a new client feature

1. Create `client/src/features/<feature>/`
2. Add `pages/`, `components/`, optional `*.slice.js`
3. Register reducer in `app/app.store.js` if using Redux
4. Add routes in `main.jsx` (or wire through `app.routes.js` + `App.jsx`)
5. Document in `docs/` if it's a major surface

## Adding a new library component

1. Create `library/src/components/<Name>/<Name>.jsx`
2. Export from `library/src/index.js`
3. Run `npm run build` in `library/`
4. Update `docs/library.md`

## Adding a server endpoint

1. Add handler in `controllers/`
2. Register route in `routes/`
3. Mount or extend router in `index.js`
4. Update `docs/api-reference.md`

## Useful references

- [Architecture](./architecture.md)
- [Authentication](./authentication.md) — known client/server gaps
- [Getting started](./getting-started.md)
