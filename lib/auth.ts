import { auth, clerkClient } from "@clerk/nextjs/server";

export type UserRole = "admin" | "user";

export async function getUserRole(): Promise<UserRole | null> {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return null;
  }

  const metadata = sessionClaims?.metadata as { role?: string } | undefined;
  if (metadata?.role === "admin") return "admin";
  if (metadata?.role === "user") return "user";

  const publicMetadata = sessionClaims?.publicMetadata as
    | { role?: string }
    | undefined;
  if (publicMetadata?.role === "admin") return "admin";
  if (publicMetadata?.role === "user") return "user";

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = user.publicMetadata?.role as string | undefined;

  if (role === "admin") return "admin";
  return "user";
}
