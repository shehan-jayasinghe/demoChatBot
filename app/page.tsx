import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6">
      <main className="flex w-full max-w-md flex-col items-center gap-8 rounded-2xl bg-white p-10 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-zinc-900">Demo Chatbot</h1>
          <p className="mt-2 text-zinc-500">Sign in as a user or admin</p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Link
            href="/sign-in/user"
            className="flex h-11 items-center justify-center rounded-lg bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800"
          >
            User Login
          </Link>
          <Link
            href="/sign-up/user"
            className="flex h-11 items-center justify-center rounded-lg border border-zinc-200 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            User Sign Up
          </Link>
          <Link
            href="/sign-in/admin"
            className="flex h-11 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-sm font-medium text-amber-900 hover:bg-amber-100"
          >
            Admin Login
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm text-zinc-600 hover:underline">
                Quick sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-sm text-zinc-600 hover:underline">
                Quick sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </main>
    </div>
  );
}
