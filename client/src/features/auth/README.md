# Auth Feature Setup Guide

## File Structure

```
auth/
├── auth.slice.js          # Redux slice with auth state & thunks
├── components/
│   ├── AuthHeader.jsx     # Auth page header component
│   ├── GoogleLoginButton.jsx
│   └── LogoutButton.jsx
├── context/
│   └── AuthContext.jsx    # Auth context provider
├── hooks/
│   └── useAuth.js         # Custom auth hook
├── pages/
│   └── LoginPage.jsx      # Main login page
└── services/
    └── authService.js     # API service for auth
```

## Features

- ✅ Google OAuth Integration
- ✅ Redux state management
- ✅ Token-based authentication
- ✅ Persistent login (localStorage)
- ✅ Protected routes via auth state

## Setup Instructions

### 1. Environment Variables

Create `.env.local` in the client folder:

```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

### 2. Install Dependencies

```bash
cd client
npm install
```

### 3. Backend Routes

The auth feature connects to:

- `POST /auth/google` - Google authentication
- `GET /auth/logout` - Logout endpoint

### 4. Usage

#### In Components:

```javascript
import { useAuth } from "@/features/auth/hooks/useAuth";

const MyComponent = () => {
  const { isAuthenticated, user, handleLogout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <>
          <p>Hello, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </>
  );
};
```

#### In Redux:

```javascript
import { useSelector } from "react-redux";

const Component = () => {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
};
```

## Design System Integration

All components use CSS variables from `app/index.css`:

- Colors: `--color-accent`, `--color-cream`, etc.
- Spacing: `--spacing-md`, `--spacing-lg`, etc.
- Typography: `--text-h1`, `--text-body-m`, etc.

Refer to the design.md for the complete design system.
