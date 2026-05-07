import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "plantsoc_admin_session";
export const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY;
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export async function isAdminUnlocked() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === ADMIN_ACCESS_KEY;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  };
}