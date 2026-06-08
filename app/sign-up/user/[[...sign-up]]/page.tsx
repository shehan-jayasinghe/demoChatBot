import { SignUp } from "@clerk/nextjs";

export default function UserSignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <SignUp
        routing="path"
        path="/sign-up/user"
        signInUrl="/sign-in/user"
        forceRedirectUrl="/user"
        fallbackRedirectUrl="/user"
      />
    </div>
  );
}
