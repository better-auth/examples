import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  	database: new Pool({
    	connectionString: process.env.DATABASE_URL,
  	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		discord: {
			enabled: true,
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
		},
		github: {
			enabled: true,
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
	},
	plugins: [twoFactor()],
});
