# Server API

The server is an **Express 5** application that provides authentication endpoints and persists users in **MongoDB**.

## Scripts

```bash
cd server
npm run dev    # nodemon index.js
```

## Entry point

**`server/index.js`**

1. Loads `dotenv`
2. Middleware: `express.json()`, `cookie-parser`, `cors()`
3. Mounts `/api/auth` router
4. Listens on `process.env.PORT`
5. Calls `connectDB()` after listen

Root health check:

```
GET /
→ "Server is running on port" + PORT (string concatenation)
```

## Environment variables

Create `server/.env`:

| Variable     | Required | Description                    |
| ------------ | -------- | ------------------------------ |
| `PORT`       | Yes      | HTTP port                      |
| `MONGO_URI`  | Yes      | MongoDB connection string      |
| `JWT_SECRET` | Yes      | Secret for `jsonwebtoken.sign` |

## Project structure

```
server/
├── index.js
├── config/
│   ├── connectDB.js    # mongoose.connect(MONGO_URI)
│   └── token.js        # generateToken(userId) → JWT, 7d
├── controllers/
│   └── auth.controller.js
├── models/
│   └── user.model.js
└── routes/
    └── auth.routes.js
```

## Database

### Connection

`connectDB()` runs after the server starts listening. Errors are logged to console; the server still binds to the port.

### User schema (`models/user.model.js`)

```javascript
{
  name: String,      // required
  email: String,     // required, unique
  role: String,      // enum: "user" | "admin", default "user"
  aiCredit: Number,  // default 150
  createdAt, updatedAt  // timestamps
}
```

Collection name: **`users`** (Mongoose model `"User"`).

## Authentication mechanism

1. **`googleAuth`** — finds or creates user by `email`, signs JWT with `user._id`
2. Sets **httpOnly cookie** `token`:
   - `maxAge`: 7 days
   - `sameSite`: `strict`
   - `secure`: `false` (set `true` in production with HTTPS)
3. Returns JSON `{ success: true, user }` — **token is not in response body**

### JWT

`config/token.js`:

```javascript
jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
```

## Routes

Mounted at **`/api/auth`**:

| Method | Path      | Handler      |
| ------ | --------- | ------------ |
| POST   | `/google` | `googleAuth` |
| GET    | `/logout` | `logout`     |

See [API reference](./api-reference.md) for request/response details.

## Dependencies

| Package         | Purpose               |
| --------------- | --------------------- |
| `express`       | HTTP server           |
| `mongoose`      | MongoDB ODM           |
| `jsonwebtoken`  | JWT creation          |
| `cookie-parser` | Read/write cookies    |
| `cors`          | Cross-origin requests |
| `dotenv`        | Environment config    |
| `nodemon`       | Dev auto-reload       |

## Security notes

- CORS is enabled for all origins (default `cors()` behavior) — tighten for production
- Cookies are not `secure` in current code — enable on HTTPS
- No middleware yet to verify JWT on protected routes
- Google `idToken` is **not verified** server-side in current controller (expects `name` + `email` in body)

## Extending the server

Suggested next endpoints (not implemented):

```
GET  /api/auth/me        # Current user from cookie/JWT
POST /api/components     # AI component generation
GET  /api/users/credits    # Remaining aiCredit
```

Add JWT verification middleware before protected routes.
