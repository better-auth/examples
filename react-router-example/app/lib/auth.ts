import { mockDiscord, mockGitHub, mockGoogle } from "@mockatoo/connect-better-auth";
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { twoFactor } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";
// Use Mockatoo outside production and when production credentials are absent.
const useMock =
    process.env.NODE_ENV !== "production" ||
    !(
        process.env.GITHUB_CLIENT_ID ||
        process.env.GOOGLE_CLIENT_ID ||
        process.env.DISCORD_CLIENT_ID
    );
const origin = process.env.MOCKATOO_URL || undefined;

export const auth = betterAuth({
    database: new Database("./sqlite.db"),
    emailAndPassword: {
        enabled: true,
        sendEmailVerificationOnSignUp: true,
        async sendVerificationEmail() {
            console.log("Send email to verify email address");
        },
        async sendResetPassword(url, user) {
            console.log("Send email to reset password");
        },
    },
    socialProviders: useMock
        ? {}
        : {
              google: {
                  clientId: process.env.GOOGLE_CLIENT_ID || "",
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
              },
              github: {
                  clientId: process.env.GITHUB_CLIENT_ID || "",
                  clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
              },
              discord: {
                  clientId: process.env.DISCORD_CLIENT_ID || "",
                  clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
              },
          },
    plugins: useMock
        ? [
              twoFactor(),
              passkey(),
              mockGoogle({ origin }),
              mockGitHub({ origin }),
              mockDiscord({ origin }),
          ]
        : [twoFactor(), passkey()],
});
