import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

type PageWrapperProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function PageWrapper({ title, subtitle, children }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>
            {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/user"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
              Dashboard
            </Link>
            <UserButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
