import { NextRequest, NextResponse } from "next/server";
import { verify } from "./assets/js";

// TODO: add highly secured routes

const JWT_SECRET = process.env.JWT_PRIVATE_KEY ?? "";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const token = req.cookies.get("token");
  let currentUser;

  if (token) {
    try {
      currentUser = await verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.rewrite(new URL("/user/login", req.url));
    }
  }
  const authRoute = ["/user/login"];

  const protectedRoute = [
    "/user/home-homeowner",
    "/user/home-staff",
    "/user/home-treasurer",
    "/user/home-bod",
  ];
  if (protectedRoute.includes(pathname)) {
    if (currentUser)
      return NextResponse.rewrite(
        new URL(`/user/home-${currentUser.type}`, req.url)
      );
    else return NextResponse.redirect(new URL("/user/login", req.url));
  }

  if (authRoute.includes(pathname) && currentUser) {
    return NextResponse.redirect(
      new URL(`/user/home-${currentUser.type}`, req.url)
    );
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/user/login",
    "/user/home-homeowner",
    "/user/home-staff",
    "/user/home-treasurer",
    "/user/home-bod",
  ],
};
