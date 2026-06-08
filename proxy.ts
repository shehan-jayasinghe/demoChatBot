import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getUserRoleFromAuth } from "@/lib/auth";

const isUserRoute = createRouteMatcher(["/user(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isProductsRoute = createRouteMatcher(["/products(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProductsRoute(req)) {
    const role = await getUserRoleFromAuth(auth);

    if (!role) {
      return NextResponse.redirect(new URL("/sign-in/user", req.url));
    }
  }

  if (isUserRoute(req)) {
    const role = await getUserRoleFromAuth(auth);

    if (!role) {
      return NextResponse.redirect(new URL("/sign-in/user", req.url));
    }

    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  if (isAdminRoute(req)) {
    const role = await getUserRoleFromAuth(auth);

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
    "/__clerk/(.*)",
  ],
};
