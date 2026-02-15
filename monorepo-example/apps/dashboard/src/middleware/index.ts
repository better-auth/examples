import { redirect } from "@solidjs/router";
import { createMiddleware } from "@solidjs/start/middleware";
import { authClient } from "~/lib/authClient";

export default createMiddleware({
    onRequest: async (event) => {
        const { data: session } = await authClient.getSession({
            fetchOptions: {
                headers: event.request.headers,
            }
        });

        if (!session?.user) {
            return redirect(new URL("/sign-in", import.meta.env.VITE_WEB_URL || "http://localhost:3000").toString());
        }

        event.locals.session = session;
    },
});