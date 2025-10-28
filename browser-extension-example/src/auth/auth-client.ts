import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	/**
	 * Base URL of your Better Auth backend
	 */
	baseURL: "http://localhost:3000",
	plugins: [],
});
