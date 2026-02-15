import { action, createAsync, query, useAction, useSubmission } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import type { Session } from "@monorepo-example/auth/types";
import { authClient } from "~/lib/authClient";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

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
  const signOutSubmission = useSubmission(signOut);

  return (
    <main class="min-h-svh grid place-items-center p-4">
      <Card class="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>Welcome, {session()?.user.name}</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
						<Avatar class="hidden h-9 w-9 sm:flex ">
							<AvatarImage
								src={session()?.user.image || "#"}
								alt="Avatar"
								class="object-cover"
							/>
							<AvatarFallback>{session()?.user.name.charAt(0).toUpperCase()}</AvatarFallback>
						</Avatar>
						<div class="grid gap-1">
							<p class="text-sm font-medium leading-none">
								{session()?.user.name}
							</p>
							<p class="text-sm">{session()?.user.email}</p>
						</div>
            <Button onClick={signOutAction} disabled={signOutSubmission.pending} size="sm">
              Sign out
            </Button>
					</div>
          <pre class="text-pretty">
            {JSON.stringify(session(), null, 2)}
          </pre>
        </CardContent>
      </Card>
    </main>
  );
}
