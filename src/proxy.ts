import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyToken } from "@/lib/auth";

const PUBLIC_API_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/api/contacto",
];

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return false;
  }

  try {
    await verifyToken(token);
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    if (PUBLIC_API_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }

    const method = request.method.toUpperCase();
    const isPublicRead = method === "GET" && pathname !== "/api/users";

    if (isPublicRead) {
      return NextResponse.next();
    }

    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
