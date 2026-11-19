# Cosmic UI

Cosmic UI is one product for building interfaces: generate React components with AI, preview and publish them, consume a component library, and use typed browser utilities from the same package.

## What is included

- AI component generation, preview, save, publish, Firebase sign-in, and plans.
- A published React component library in `library/`.
- Tree-shakeable browser, performance, and general utilities.
- Express APIs for authentication, components, payments, and generation.

## Project structure

```text
client/   Vite + React product interface
server/   Express, MongoDB, Razorpay, and OpenRouter APIs
library/  Published components and browser utilities
docs/     Architecture and development notes
```

## Local development

Install each workspace, then run the client and server in separate terminals.

```bash
npm install
cd client && npm install && npm run dev
cd ../server && npm install && npm run dev
cd ../library && npm install && npm run build
```

The client expects `VITE_API_URL`, Firebase configuration, and Google client configuration. The server requires `MONGO_URI`, `JWT_SECRET`, `OPENROUTER_API_KEY`, Razorpay credentials, and its allowed `CLIENT_URL`. Never commit either `.env` file.

## Library usage

```js
import { Button, copyToClipboard, debounce } from "cosmic-ui-library";
import { generateOTP } from "cosmic-ui-library/utils/general/otp";
import { getItem, setItem } from "cosmic-ui-library/utils/browser/storage";
```

Build and publish from the library workspace:

```bash
cd library
npm run typecheck
npm run build
npm publish
```

## Docker

Configure `server/.env`, then run `docker compose up --build`. Review the client URL, server URL, Firebase origins, Razorpay callback configuration, and MongoDB network access before deployment.

## Contributing and credits

Use Conventional Commit messages; formatting, linting, and the root Husky configuration are the project’s single quality-tooling source.

Portions of the utility toolkit and visual design direction are derived from WebDev Power Kit by Aditya Kumar Gupta, licensed MIT. The retained notice is in [NOTICE.md](NOTICE.md).
