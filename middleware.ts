import { NextRequest, NextResponse } from "next/server";

// TODO: apply middleware that reroute to admin home is logged-in, otherwise route to landing page
// TODO: create routes separate by level
// TODO: Add expire date

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();
  // const pathname = url.pathname;
  // const publicRoute = ["/"];
  // const authRoute = ["user/login"];
  // const protectedRoute = [
  //   "/user/home-homeowner",
  //   "/user/home-staff",
  //   "/user/home-treasurer",
  //   "/user/home-bod",
  // ];
  // const currentUser = req.cookies.get("currentUser");
  // if (
  //   protectedRoute.includes(pathname) &&
  //   (!currentUser || Date.now() > JSON.parse(currentUser).expireDate)
  // ) {
  //   req.cookies.delete("currentUser");
  //   const res = NextResponse.redirect(new URL("/user/login", req.url));
  //   res.cookies.delete("currentUser");
  //   return res;
  // }
  // if (authRoute.includes(pathname) && currentUser) {
  //   return NextResponse.redirect(new URL(pathname, req.url));
  // }
  // if (publicRoute.includes(pathname)) {
  //   return NextResponse.rewrite(url);
  // }
}
