# Client application

The client is a **React 19** single-page app built with **Vite 8**, focused on authentication and the Cosmic UI marketing/login experience.

## Scripts

```bash
cd client
npm run dev      # Start dev server (default :5173)
npm run build    # Production build → dist/
npm run preview  # Preview production build
npm run lint     # ESLint
```

## Entry and bootstrap

**`src/main.jsx`** wraps the app with:

1. `StrictMode`
2. Redux `Provider` (`app/app.store.js`)
3. `BrowserRouter` with routes:
   - `/` → `LoginPage`
   - `*` → redirect to `/`

**Note:** `app/App.jsx` and `app/app.routes.js` exist but are not used by `main.jsx` yet.

## Directory structure

```
client/src/
├── main.jsx
├── app/
│   ├── App.jsx              # Auth bootstrap + loading shell
│   ├── app.store.js         # Redux store (auth reducer only)
│   ├── app.routes.js        # Route definitions (unused by main)
│   └── index.css            # Tailwind + design tokens
├── features/auth/
│   ├── auth.slice.js        # Redux: googleAuth, logout, initializeAuth
│   ├── hooks/useAuth.js     # Dispatch helpers + auth state
│   ├── services/authService.js
│   ├── context/AuthContext.jsx
│   ├── components/
│   │   ├── AuthHeader.jsx
│   │   ├── GoogleLoginButton.jsx
│   │   └── LogoutButton.jsx
│   └── pages/
│       ├── LoginPage.jsx    # Main UI (active route)
│       └── loginSteps.jsx   # "How it works" step content
├── utils/
│   ├── firebase.js
│   ├── storage.js
│   ├── errorHandler.js
│   └── useForm.js
└── Design/design.md
```

## State management

Redux Toolkit store with a single slice: **`auth`**.

| State field       | Type           | Description                 |
| ----------------- | -------------- | --------------------------- |
| `user`            | object \| null | Logged-in user from API     |
| `token`           | string \| null | JWT from localStorage       |
| `isAuthenticated` | boolean        | Derived from token presence |
| `loading`         | boolean        | Async / init loading        |
| `error`           | string \| null | Last auth error message     |

### Thunks

- **`googleAuth(idToken)`** — POST to API, save token to `localStorage`
- **`logout()`** — GET logout, clear `localStorage`

### Actions

- **`initializeAuth`** — On app load, read token from `localStorage`
- **`clearError`** — Reset error state

## Auth hook

```javascript
import { useAuth } from "./features/auth/hooks/useAuth";

const { isAuthenticated, user, loading, error, handleGoogleAuth, handleLogout } = useAuth();
```

## Login page

`LoginPage.jsx` is the primary screen:

- Fixed header with nav links (placeholder URLs)
- Split card: dark left panel (animated steps), cream right panel (Google login)
- Stats row: **150 credits**, unlimited components, JSX ready
- **Framer Motion** for step carousel and layout animations
- Google sign-in via Firebase `signInWithPopup` → `handleGoogleAuth(idToken)`

### Login steps (`loginSteps.jsx`)

| Step | Title              |
| ---- | ------------------ |
| 1    | Login with Google  |
| 2    | Get 150 AI Credits |
| 3    | Customize Props    |
| 4    | Export JSX         |

Steps auto-advance every 4 seconds unless paused (hover/click).

## API client

`authService.js` creates an Axios instance:

- **Base URL:** `import.meta.env.VITE_API_URL` (default `http://localhost:5000/api`)
- **Request interceptor:** adds `Authorization: Bearer <token>` from `localStorage`

Exports:

- `googleAuthService(idToken)`
- `logoutService()` — Firebase `signOut` then API logout
- `auth`, `provider` — Firebase instances

## Utilities

### `storage.js`

JSON-aware `localStorage` wrapper: `get`, `set`, `remove`, `clear`.

### `errorHandler.js`

- `handleApiError(error)` — normalize Axios errors
- `formatErrorMessage(error)` — user-facing string
- `retryWithBackoff(fn, retries, delay)` — exponential backoff helper

### `useForm.js`

Generic controlled form hook (values, change handler, submit).

## Environment variables

See `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Firebase also reads `VITE_FIREBASE_API_KEY` in `utils/firebase.js`.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- Theme extension in `app/index.css` using `@theme { ... }`
- Custom utilities: `rounded-custom`, `animate-fade-in`, scrollbar helpers

## Dependencies (key)

| Package                            | Purpose               |
| ---------------------------------- | --------------------- |
| `react` / `react-dom`              | UI                    |
| `@reduxjs/toolkit` / `react-redux` | State                 |
| `react-router-dom`                 | Routing               |
| `axios`                            | HTTP                  |
| `firebase`                         | Google authentication |
| `framer-motion`                    | Animations            |
| `tailwindcss`                      | Styling               |

## Planned / referenced but not implemented

- `/dashboard` protected route
- Wiring `App.jsx` as root layout
- Importing `cosmic-ui-library` into client pages

See [Authentication](./authentication.md) for API integration status.
