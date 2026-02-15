import { betterAuth } from "better-auth";
import { env, isDevelopment, isProduction } from "@monorepo-example/env";

export const auth = betterAuth({
    // Add a database for production at minimum.
    database: undefined,
    basePath: "/auth",
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
	trustedOrigins: env.CLIENT_ORIGIN ? env.CLIENT_ORIGIN.split(",") : ["http://localhost:*"],
	advanced: {
		useSecureCookies: isProduction,
		crossSubDomainCookies: {
			enabled: isProduction,
			domain: ".example.com"
		},
		disableCSRFCheck: isDevelopment,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID || "",
			clientSecret: env.GOOGLE_CLIENT_SECRET || "",
		},
		github: {
			clientId: env.GITHUB_CLIENT_ID || "",
			clientSecret: env.GITHUB_CLIENT_SECRET || "",
		},
		discord: {
			clientId: env.DISCORD_CLIENT_ID || "",
			clientSecret: env.DISCORD_CLIENT_SECRET || "",
		},
	},
});
