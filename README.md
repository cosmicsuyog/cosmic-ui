# Cosmic UI

Cosmic UI is a React component platform with AI-assisted component generation,
an Express API, and a tree-shakeable browser utility library.

## Packages

- `client/` — Vite React product UI, including the Power Kit utility catalog.
- `server/` — Express API for authentication, generation, components, and payments.
- `library/` — published component and utility package.

### Browser utilities

The library now exports browser, performance, and general utilities:

```js
import { copyToClipboard, debounce, generateOTP } from "cosmic-ui-library";
import { getCurrentLocation } from "cosmic-ui-library/utils/browser";
```

Run `npm run build` inside `library` to build the package and inside `client`
to build the Vite application.

## Attribution

The merged browser utility catalog and visual design language incorporate
WebDev Power Kit, created by Aditya Kumar Gupta and licensed under MIT. See
`NOTICE.md` for the notice retained with this repository.

Cosmic UI is a React app for generating, previewing, saving, and publishing UI components, with an Express API and a separate npm component library package.

## Project Structure

```text
client/   Vite React frontend
server/   Express API, auth, payments, component routes
library/  Published React component package
docs/     Project design notes
```

## Local Development

Install dependencies in each workspace:

```bash
npm install
cd client && npm install
cd ../server && npm install
cd ../library && npm install
```

Create local env files:

```bash
copy client\.env.example client\.env
copy server\.env.example server\.env
```

Run the app:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

## Production With Docker

Create `server/.env` from `server/.env.example`, then run:

```bash
docker compose up --build
```

The frontend runs at `http://localhost:8080`.
The production API runs at `https://cosmic-ui.onrender.com`.
The health check endpoint is `https://cosmic-ui.onrender.com/api/health`.

## Required Server Environment

```text
PORT=3000
NODE_ENV=production
CLIENT_URL=https://cosmic-ui-z179.vercel.app
MONGO_URI=
JWT_SECRET=
OPENROUTER_API_KEY=
NPM_TOKEN=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

## Client Build Environment

```text
VITE_API_URL=https://cosmic-ui.onrender.com/api
VITE_FIREBASE_API_KEY=
VITE_GOOGLE_CLIENT_ID=
```

## npm Library

The package lives in `library/`.

```bash
cd library
npm run build
npm publish
```
