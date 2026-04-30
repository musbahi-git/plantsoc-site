import { NextResponse } from "next/server";
import {
  ADMIN_ACCESS_KEY,
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  getAdminCookieOptions,
} from "@/lib/admin-auth";

type SessionPayload = {
  accessKey?: string;
};

export async function POST(request: Request) {
  let payload: SessionPayload = {};

  try {
    payload = (await request.json()) as SessionPayload;
  } catch {
    return NextResponse.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  if ((payload.accessKey ?? "").trim() !== ADMIN_ACCESS_KEY) {
    return NextResponse.json({ error: "Invalid access key." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, ADMIN_ACCESS_KEY, {
    ...getAdminCookieOptions(),
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...getAdminCookieOptions(),
    maxAge: 0,
  });

  return response;
}