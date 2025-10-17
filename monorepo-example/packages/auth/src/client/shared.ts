import { ClientOptions } from "better-auth";
import { env } from "@monorepo-example/env";

export const sharedOptions: ClientOptions = {
    baseURL:  env.NEXT_PUBLIC_API_URL || env.VITE_API_URL || "http://localhost:4000",
    basePath: "/auth",
    plugins: [],
}