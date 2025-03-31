import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Protect routes that require authentication
  if (
    req.nextUrl.pathname.startsWith("/team") ||
    req.nextUrl.pathname.startsWith("/profile")
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};