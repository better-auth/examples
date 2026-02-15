# Better Auth Monorepo Example

This is an example of how to use Better Auth inside a monorepo.

**Implements the following features:**

- Email & Password
- [Fastify auth server](apps/api)
- [NextJS app](apps/web)
- [SolidStart app](apps/dashboard)

## How to run

1. Clone the code sandbox (or the repo) and open it in your code editor
2. Rename all .env.example files to .env and provide necessary variables
3. Run the following commands
   ```bash
   pnpm install
   pnpm apps:dev
   ```
4. Open the browser and navigate to `http://localhost:3000/sign-up`
