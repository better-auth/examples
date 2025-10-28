import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  	database: new Pool({
    	connectionString: process.env.DATABASE_URL,
  	}),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		},
	},
	emailAndPassword: {
		enabled: true,
		async sendResetPassword(url, user) {
			console.log("Reset password url:", url);
		},
	},
});
