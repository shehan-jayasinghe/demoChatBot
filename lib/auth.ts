import { auth, clerkClient, type ClerkMiddlewareAuth } from "@clerk/nextjs/server";

export type UserRole = "admin" | "user";

type SessionClaims = {
  metadata?: { role?: string };
  publicMetadata?: { role?: string };
};

function roleFromClaims(sessionClaims: SessionClaims | null | undefined): UserRole | null {
  const metadata = sessionClaims?.metadata;
  if (metadata?.role === "admin") return "admin";
  if (metadata?.role === "user") return "user";

  const publicMetadata = sessionClaims?.publicMetadata;
  if (publicMetadata?.role === "admin") return "admin";
  if (publicMetadata?.role === "user") return "user";

  return null;
}

export async function resolveUserRole(
  userId: string | null | undefined,
  sessionClaims: SessionClaims | null | undefined,
): Promise<UserRole | null> {
  if (!userId) {
    return null;
  }

  const claimRole = roleFromClaims(sessionClaims);
  if (claimRole) {
    return claimRole;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = user.publicMetadata?.role as string | undefined;

  if (role === "admin") return "admin";
  return "user";
}

export async function getUserRoleFromAuth(
  authFn: ClerkMiddlewareAuth,
): Promise<UserRole | null> {
  const { userId, sessionClaims } = await authFn();
  return resolveUserRole(userId, sessionClaims as SessionClaims);
}

export async function getUserRole(): Promise<UserRole | null> {
  const { userId, sessionClaims } = await auth();
  return resolveUserRole(userId, sessionClaims as SessionClaims);
}
