export const CONFIG = {
  LOCAL: process.env.NEXT_PUBLIC_LOCAL,
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  ENV: process.env.NODE_ENV,
  API_KEYS: {
    LOGIN: process.env.NEXT_PUBLIC_KAKAO_LOGIN_API_KEY,
    MAP: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY,
  },
} as const;
