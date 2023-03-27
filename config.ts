export const CONFIG = {
  LOCAL: process.env.NEXT_PUBLIC_LOCAL,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  API_KEYS: {
    LOGIN: process.env.NEXT_PUBLIC_KAKAO_LOGIN_API_KEY,
    MAP: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY,
  },
} as const;
