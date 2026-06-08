import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getUserRole } from "@/lib/auth";

export default async function UserPage() {
  const role = await getUserRole();

  if (!role) {
    redirect("/sign-in/user");
  }

  if (role === "admin") {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <UserButton />
      <h1 className="text-2xl font-semibold text-zinc-900">User Dashboard</h1>
      <p className="text-zinc-500">Blank page — customer area coming soon.</p>
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        Back to home
      </Link>
    </main>
  );
}
