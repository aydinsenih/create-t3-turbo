"use client";

import { Button } from "@atlas/ui/button";

import { authClient } from "~/auth/client";

export function AuthShowcase() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <Button
        size="lg"
        onClick={async () => {
          await authClient.signIn.social({
            provider: "discord",
            callbackURL: window.location.origin + "/",
          });
        }}
      >
        Sign in with Discord
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.user.name}</span>
      </p>

      <Button
        size="lg"
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                window.location.href = "/";
              },
            },
          });
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
