import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/(auth)/(routes)/sign-in(.*)",
    "/(auth)/(routes)/sign-up(.*)"
  ],
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",  // Match everything except static files and Next.js internals
    "/dashboard(.*)",
    "/(api|trpc)(.*)",
  ],
};
