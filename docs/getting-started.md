# Getting started

## Prerequisites

- **Node.js** 18+ (recommended 20+)
- **npm**
- **MongoDB** instance (local or Atlas) for the server
- **Google Cloud / Firebase** project for Google Sign-In (client)

## 1. Clone and install

From the repository root:

```bash
npm install
```

Install each workspace package:

```bash
cd server && npm install
cd ../client && npm install
cd ../library && npm install
```

## 2. Server setup

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cosmic-ui
JWT_SECRET=your_jwt_secret_here
```

| Variable     | Required | Description                   |
| ------------ | -------- | ----------------------------- |
| `PORT`       | Yes      | HTTP port for Express         |
| `MONGO_URI`  | Yes      | MongoDB connection string     |
| `JWT_SECRET` | Yes      | Secret for signing JWT tokens |

Start the API:

```bash
cd server
npm run dev
```

You should see: `Server is running on port 5000` and `Connected to MongoDB`.

## 3. Client setup

Copy the environment template:

```bash
cd client
cp .env.example .env.local
```

Edit `client/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

| Variable                | Required   | Description                        |
| ----------------------- | ---------- | ---------------------------------- |
| `VITE_API_URL`          | Yes        | Base URL for API (includes `/api`) |
| `VITE_GOOGLE_CLIENT_ID` | Optional\* | Google OAuth client ID             |
| `VITE_FIREBASE_API_KEY` | Yes        | Firebase Web API key               |

\* Firebase config in `client/src/utils/firebase.js` also hardcodes project settings; align Firebase console with that project or update the file.

Start the dev server:

```bash
npm run dev
```

Open http://localhost:5173 — the login page loads at `/`.

## 4. Component library (optional)

Build the library for local consumption or publishing:

```bash
cd library
npm run build
```

Output is written to `library/dist/` (`index.js` CJS, `index.mjs` ESM).

## 5. Root tooling

From the repo root:

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run lint`         | ESLint across the monorepo |
| `npm run lint:fix`     | ESLint with auto-fix       |
| `npm run format`       | Prettier write             |
| `npm run format:check` | Prettier check only        |

Git hooks (via Husky) run **lint-staged** on commit and **commitlint** on commit messages.

## Troubleshooting

| Issue                                      | What to check                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------- |
| Server won't start                         | `PORT` and `MONGO_URI` in `server/.env`                                    |
| MongoDB connection fails                   | MongoDB running; URI correct                                               |
| Google login fails                         | Firebase project, authorized domains, `VITE_FIREBASE_API_KEY`              |
| API calls fail                             | `VITE_API_URL` matches server; CORS (server uses open `cors()`)            |
| Auth succeeds on UI but user not persisted | See [Authentication](./authentication.md) for client/server contract notes |

## Next steps

- [Architecture](./architecture.md) — how packages connect
- [Authentication](./authentication.md) — login flow
- [Design system](./design-system.md) — UI tokens and styling
