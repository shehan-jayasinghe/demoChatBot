import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getUserRole } from "@/lib/auth";

export default async function AdminPage() {
  const role = await getUserRole();

  if (!role) {
    redirect("/sign-in/admin");
  }

  if (role !== "admin") {
    redirect("/user");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <UserButton />
      <h1 className="text-2xl font-semibold text-zinc-900">Admin Dashboard</h1>
      <p className="text-zinc-500">Blank page — admin area coming soon.</p>
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        Back to home
      </Link>
    </main>
  );
}
