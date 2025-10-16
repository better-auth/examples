import { betterAuth } from "better-auth";

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
	trustedOrigins: [process.env.CLIENT_ORIGIN || "http://localhost:3000"],
	advanced: {
		useSecureCookies: process.env.NODE_ENV === "production",
		crossSubDomainCookies: {
			enabled: process.env.NODE_ENV === "production",
			domain: ".example.com"
		}
	},
	socialProviders: {
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
})
