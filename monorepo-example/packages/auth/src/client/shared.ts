import { ClientOptions } from "better-auth";

export const sharedOptions: ClientOptions = {
    baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    basePath: "/auth",
    plugins: [],
}