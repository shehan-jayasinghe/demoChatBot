import { SignIn } from "@clerk/nextjs";

export default function UserSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <SignIn
        routing="path"
        path="/sign-in/user"
        signUpUrl="/sign-up/user"
        forceRedirectUrl="/products"
        fallbackRedirectUrl="/products"
      />
    </div>
  );
}
