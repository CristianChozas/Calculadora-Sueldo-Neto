const DEVELOPMENT_SITE_URL = "http://localhost:3000";
const CANONICAL_SITE_URL = "https://calculadora-sueldo-neto-pi.vercel.app";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.NODE_ENV === "development") {
    return DEVELOPMENT_SITE_URL;
  }

  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return CANONICAL_SITE_URL;
}
