import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const session = req.cookies.get("session")?.value;
    const isAuthPage = req.url.includes("/auth");

    if (isAuthPage) {
        if (session) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
    }

    if (!session) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
