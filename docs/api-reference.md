# API reference

Base URL (development): **`http://localhost:5000/api`**

All auth routes are prefixed with **`/auth`**.

---

## `POST /auth/google`

Authenticate or register a user after Google sign-in.

### Request

**Headers**

```
Content-Type: application/json
```

**Body (server implementation today)**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Body (client sends today)**

```json
{
  "idToken": "<firebase_id_token>"
}
```

> **Integration note:** Client and server payloads currently differ. The server does not verify Firebase `idToken` yet; the client does not send `name`/`email`. See [Authentication](./authentication.md).

### Success response

**Status:** `200 OK`

**Set-Cookie:** `token=<jwt>; HttpOnly; SameSite=Strict; Max-Age=604800`

**Body:**

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user",
    "aiCredit": 150,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Error response

**Status:** `500 Internal Server Error`

```json
{
  "success": false,
  "message": "Google Auth Error : <error>"
}
```

---

## `GET /auth/logout`

Clear the session cookie.

### Request

**Headers (optional, client sends)**

```
Authorization: Bearer <token>
```

The server clears the cookie regardless; Bearer token is not validated in the controller.

### Success response

**Status:** `200 OK`

**Set-Cookie:** `token=;` (cleared)

**Body:**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Error response

**Status:** `500 Internal Server Error`

```json
{
  "success": false,
  "message": "Logout Error : <error>"
}
```

---

## `GET /` (root)

Health-style endpoint on the Express app root (not under `/api`).

**Response:** Plain text — server running message with port.

---

## Client integration example

```javascript
// Expected by authService.js
const response = await axios.post(`${API_URL}/auth/google`, { idToken });
const { token, user } = response.data; // client expects token in body
```

To align with the server today, either:

1. Update the server to verify `idToken`, return `{ token, user }`, or
2. Update the client to send `{ name, email }` and read the user from the cookie/session

---

## Error handling on the client

Use `utils/errorHandler.js`:

```javascript
import { formatErrorMessage } from "../utils/errorHandler";

try {
  await googleAuthService(idToken);
} catch (err) {
  console.error(formatErrorMessage(err));
}
```
