import { betterAuth } from "better-auth";
import { env } from "$env/dynamic/private";
import { Pool } from "pg";

export const auth = betterAuth({
  	database: new Pool({
    	connectionString: process.env.DATABASE_URL,
  	}),
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID || "",
			clientSecret: env.GOOGLE_CLIENT_SECRET || "",
		},
	},
	emailAndPassword: {
		enabled: true,
		async sendResetPassword(url, user) {
			console.log("Reset password url:", url);
		},
	},
	emailVerification: {
		sendOnSignUp: false, // TODO enable this option to send email to the user on sign up
		// sendVerificationEmail: async ({ user, url, token }, request) => {
		// 	// TODO add function(s) to send verification email.
		// },
	},
});
