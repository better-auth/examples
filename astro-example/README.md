# Astro Example

This is an example of how to use Better Auth with Astro. It uses Solid for building the components.


**Implements the following features:**
Email & Password . Social Sign-in with Google and Gitbub . Passkeys . Email Verification . Password Reset . Two Factor Authentication . Profile Update . Session Management


## How to run

1. Clone the code sandbox (or the repo) and open it in your code editor
2. Provide .env file with the following variables
   ```txt
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   BETTER_AUTH_SECRET=
   ```
   //if you don't have these, you can get them from the [google developer console](https://console.cloud.google.com/auth/clients/) and [github developer settings](https://github.com/settings/developers). If you don't want to use google or github sign-in, you can remove the config from the [auth.ts](./src/auth.ts) file.

   Authorization callback URL  
   Github: `http://localhost:3000/api/auth/callback/github`  
   Google: `http://localhost:3000/api/auth/callback/google`  

3. Run the following commands
   ```bash
   pnpm install
   pnpm run dev
   ```
4. Open the browser and navigate to `http://localhost:3000`
