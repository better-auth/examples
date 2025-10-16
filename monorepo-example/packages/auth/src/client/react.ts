import { createAuthClient as createClient } from "better-auth/react";
import { sharedOptions } from "./shared";

export function createAuthClient() {
    return createClient(sharedOptions);
}
