import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { Pool } from 'pg'

export const auth = betterAuth({
  	database: new Pool({
    	connectionString: process.env.DATABASE_URL,
  	}),
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
	plugins: [twoFactor(), passkey()],
});
