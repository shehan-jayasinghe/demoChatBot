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
      <Link
        href="/products"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
      >
        Browse Products
      </Link>
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        Back to home
      </Link>
    </main>
  );
}
