import { createAuthClient } from "@monorepo-example/auth/solid";

export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
