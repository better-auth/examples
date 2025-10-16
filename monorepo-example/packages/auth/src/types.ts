import type { auth } from ".";

export type Auth = typeof auth;

export type Session = Auth["$Infer"]["Session"];
