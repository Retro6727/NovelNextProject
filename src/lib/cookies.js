"use server";

import { cookies } from "next/headers";

// SERVER-SIDE COOKIE SETTER
export async function setServerCookie(name, value, options = {}) {
  const cookieStore = cookies();

  cookieStore.set({
    name,
    value,
    httpOnly: options.httpOnly ?? true,
    path: options.path ?? "/",
    maxAge: options.maxAge ?? 60 * 60 * 24 * 7, // 7 days
    secure: true,
    sameSite: "lax",
  });
}

// CLIENT-SIDE COOKIE SETTER
export function setCookie(name, value, days = 7) {
  if (typeof window === "undefined") return; // SSR safety

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}
