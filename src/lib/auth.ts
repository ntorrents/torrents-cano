import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "atelier_session";

function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256")
    .update(`atelier:${password}`)
    .digest("hex");
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function isAuthenticated(): Promise<boolean> {
  const expected = sessionToken();
  if (!expected) return false;

  const jar = await cookies();
  const value = jar.get(COOKIE_NAME)?.value;
  if (!value || value.length !== expected.length) return false;

  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function createSession(): Promise<boolean> {
  const token = sessionToken();
  if (!token) return false;

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (password.length !== expected.length) {
    // still do a compare-length-safe check path
    const a = createHash("sha256").update(password).digest();
    const b = createHash("sha256").update(expected).digest();
    timingSafeEqual(a, b);
    return false;
  }
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}
