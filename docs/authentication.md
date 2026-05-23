# Authentication

Cosmic UI uses **Google Sign-In** on the client (Firebase) and **JWT sessions** on the server (httpOnly cookie). Redux on the client tracks auth state and mirrors a token in **localStorage**.

## Flow overview

```
1. User clicks "Continue with Google" on LoginPage
2. Firebase signInWithPopup → Firebase User + idToken
3. Client dispatches googleAuth(idToken) [Redux thunk]
4. authService POST /api/auth/google { idToken }
5. Server should create/find user and establish session
6. Client stores token in localStorage and updates Redux
```

## Client implementation

### Firebase (`client/src/utils/firebase.js`)

- Project: `cosmicui` (hardcoded config)
- `GoogleAuthProvider` for popup sign-in
- Requires `VITE_FIREBASE_API_KEY` (and authorized domains in Firebase console)

### Login trigger (`LoginPage.jsx`)

```javascript
const result = await signInWithPopup(auth, provider);
const idToken = await result.user.getIdToken();
await handleGoogleAuth(idToken);
```

### Redux (`auth.slice.js`)

| Thunk / action   | Behavior                                                           |
| ---------------- | ------------------------------------------------------------------ |
| `googleAuth`     | POST idToken, expect `{ token, user }`, save token to localStorage |
| `logout`         | GET `/auth/logout`, remove localStorage token                      |
| `initializeAuth` | Read token from localStorage on startup                            |

### Axios interceptor (`authService.js`)

Attaches `Authorization: Bearer <token>` when localStorage has a token.

## Server implementation

### `googleAuth` controller

1. Reads `{ name, email }` from `req.body`
2. `findOne({ email })` or `create({ name, email })`
3. `generateToken(user._id)` → JWT
4. Sets httpOnly cookie `token`
5. Returns `{ success: true, user }` — **no token in JSON body**

### `logout` controller

Clears `token` cookie, returns success message.

## User credits

New users receive **`aiCredit: 150`** (MongoDB default). The login UI displays this in the stats row.

## Current integration gaps

The following mismatches exist in the codebase and should be resolved for end-to-end auth to work reliably:

| Area                | Client expects                 | Server implements                          |
| ------------------- | ------------------------------ | ------------------------------------------ |
| Request body        | `{ idToken }`                  | `{ name, email }`                          |
| Response body       | `{ token, user }`              | `{ success, user }` (token in cookie only) |
| Token storage       | `localStorage` + Bearer header | httpOnly cookie                            |
| Google verification | Firebase on client only        | No `idToken` verification on server        |

### Recommended alignment options

**Option A — Cookie session (recommended for web)**

1. Server verifies Firebase `idToken` (Firebase Admin SDK)
2. Extract `name`, `email` from decoded token
3. Set httpOnly cookie only; return `{ user }`
4. Client: remove localStorage token; use `credentials: 'include'` on Axios
5. Add `GET /api/auth/me` to hydrate Redux user on load

**Option B — Bearer token (SPA API style)**

1. Server verifies `idToken`, returns `{ token, user }` in JSON
2. Client keeps localStorage + Authorization header
3. Optionally skip httpOnly cookie

## Components and hooks

| File                    | Role                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `useAuth.js`            | `handleGoogleAuth`, `handleLogout`, spreads Redux auth state |
| `GoogleLoginButton.jsx` | Reusable Google button (if used outside LoginPage)           |
| `LogoutButton.jsx`      | Triggers logout                                              |
| `AuthContext.jsx`       | Context provider (optional pattern alongside Redux)          |
| `AuthHeader.jsx`        | Auth section header UI                                       |

## Environment checklist

**Client (`client/.env.local`)**

- `VITE_API_URL`
- `VITE_FIREBASE_API_KEY`
- `VITE_GOOGLE_CLIENT_ID` (if using Google Identity separately)

**Server (`server/.env`)**

- `JWT_SECRET`
- `MONGO_URI`
- (Future) `FIREBASE_PROJECT_ID`, service account for Admin SDK

## Protected routes (planned)

`SETUP_COMPLETE.md` references `/dashboard` as protected; routing in `main.jsx` only serves `/` today. To add protection:

```javascript
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) return <Loading />;
  return isAuthenticated ? children : <Navigate to="/" />;
}
```

## Security checklist

- [ ] Verify Google/Firebase `idToken` on server
- [ ] Use `secure: true` cookies in production
- [ ] Restrict CORS to client origin
- [ ] Add auth middleware for protected API routes
- [ ] Do not commit secrets or Firebase keys to git
