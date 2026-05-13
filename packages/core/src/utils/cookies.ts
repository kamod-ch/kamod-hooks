export interface CookieSerializeOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none" | "Strict" | "Lax" | "None";
  [key: string]: unknown;
}

function parseCookieHeader(): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof document === "undefined" || !document.cookie) {
    return out;
  }
  for (const part of document.cookie.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) {
      continue;
    }
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    try {
      out[decodeURIComponent(key)] = decodeURIComponent(val);
    } catch {
      out[key] = val;
    }
  }
  return out;
}

export function cookieGet(name: string): string | undefined {
  return parseCookieHeader()[name];
}

export function cookieSet(name: string, value: string, options: CookieSerializeOptions = {}): void {
  let s = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  if (options.expires !== undefined) {
    const d =
      typeof options.expires === "number" ? new Date(Date.now() + options.expires * 864e5) : options.expires;
    s += `; expires=${d.toUTCString()}`;
  }
  if (options.path) {
    s += `; path=${options.path}`;
  } else {
    s += "; path=/";
  }
  if (options.domain) {
    s += `; domain=${options.domain}`;
  }
  if (options.secure) {
    s += "; secure";
  }
  if (options.sameSite) {
    const ss = String(options.sameSite).toLowerCase();
    s += `; samesite=${ss === "none" ? "None" : ss === "lax" ? "Lax" : "Strict"}`;
  }
  document.cookie = s;
}

export function cookieRemove(
  name: string,
  options: Pick<CookieSerializeOptions, "path" | "domain"> = {}
): void {
  cookieSet(name, "", { ...options, expires: new Date(0) });
}
