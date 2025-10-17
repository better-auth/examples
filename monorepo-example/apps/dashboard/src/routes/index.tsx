import { action, createAsync, query, useAction } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import type { Session } from "@monorepo-example/auth/types";
import { authClient } from "~/lib/authClient";

const getSession = query(async () => {
  "use server";
  const event = getRequestEvent();
  return event?.locals.session as Session;
}, "session");

const signOut = action(async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = new URL(
          "/sign-in",
          import.meta.env.VITE_WEB_URL || "http://localhost:3000"
        ).toString();
      },
    },
  });
}, "signOut");

export default function Home() {
  const session = createAsync(() => getSession());
  const signOutAction = useAction(signOut);

  return (
    <main>
      <pre class="text-pretty">
        {JSON.stringify(session(), null, 2)}
      </pre>
      <button class="bg-white text-black" onClick={signOutAction}>
        Sign out
      </button>
    </main>
  );
}
