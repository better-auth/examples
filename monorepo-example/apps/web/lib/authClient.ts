import { createAuthClient } from "@monorepo-example/auth/react";

export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
