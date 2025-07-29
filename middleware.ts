import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)"],
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // general matcher
    "/dashboard(.*)",         // allow dashboard with nested routes
    "/(api|trpc)(.*)",        // API routes
  ],
};
