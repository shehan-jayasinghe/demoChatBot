import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getUserRole } from "@/lib/auth";

const isUserRoute = createRouteMatcher(["/user(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (_auth, req) => {
  if (isUserRoute(req)) {
    const role = await getUserRole();

    if (!role) {
      return NextResponse.redirect(new URL("/sign-in/user", req.url));
    }

    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  if (isAdminRoute(req)) {
    const role = await getUserRole();

    if (!role) {
      return NextResponse.redirect(new URL("/sign-in/admin", req.url));
    }

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
