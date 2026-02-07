# Express.js + Better Auth Example

This example demonstrates how to use **Better Auth** with an **Express.js** backend using Prisma.

It is intended as a minimal reference for setting up authentication APIs and protected routes in an Express application.

---

## What’s included

* Express.js server setup
* Prisma integration
* Better Auth initialization
* Email/password authentication
* Auth middleware for protected routes

### Custom auth configuration

* Minimum password length set to **5**
* `trustedOrigins` enabled for local development

Configuration lives in:

```
src/lib/auth.ts
```

---

## Setup

```bash
pnpm install
pnpm prisma migrate dev
pnpm run dev
```

Create a `.env` file using `.env.example` and configure:

* Database connection
* Better Auth secrets
* App URLs

---

## Authentication Middleware

The example includes an auth middleware that:

* Verifies whether a request is authenticated
* Rejects unauthenticated requests
* Fetches the session via `getSession`
* Attaches the authenticated user to the request object

This middleware can be reused for any protected route.

---

## Available APIs

* **GET** `/api/auth/ok`
  Health check endpoint

* **POST** `/api/auth/sign-up/email`
  Sign up with email and password

* **POST** `/api/auth/sign-in/email`
  Sign in with email and password

Request body:

```json
{
  "name": "Jay Shende",
  "email": "jay@example.com",
  "password": "strongpassword"
}
```

* **GET** `/api/auth/get-session`
  Returns the current session

* **POST** `/api/auth/sign-out`
  Signs out the user

---

## Testing (Postman)

When testing locally, include the following header:

```
Origin: http://localhost:3000
```

This origin is added to `trustedOrigins` in the example.

---

## Notes

* Backend-only example
* Intended for learning and reference
* Can be extended for RBAC or custom authorization logic

---
