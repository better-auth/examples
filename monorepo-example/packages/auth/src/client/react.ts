import { createAuthClient as createClient } from "better-auth/react";
import { sharedOptions } from "./shared";

export type AuthClient = ReturnType<typeof createClient<typeof sharedOptions>>;

export function createAuthClient(): AuthClient {
    return createClient(sharedOptions);
}
