import axios from 'axios';
import { CONFIG } from '@config';
import { getToken, setToken } from '@utils/token';
import authApi from '@apis/auth/authApi';

const ReissueToken = async () => {
  const refreshToken = getToken().refreshToken;
  const data = await authApi.reissueToken(refreshToken);
  return data.access_token;
};

const instance = axios.create({
  baseURL: CONFIG.BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config: originalRequest, response } = error;
    const { status } = response;
    const InvalidTokenError = status === 400;
    const ExpiredTokenError = status === 401;
    const UnAuthorizeError = status === 403;

    if (UnAuthorizeError) {
      return Promise.reject(error);
    }
    if (InvalidTokenError) {
      return Promise.reject(error);
    }
    if (ExpiredTokenError) {
      const accessToken = await ReissueToken();
      setToken({
        accessToken,
        refreshToken: getToken().refreshToken,
      });
      return instance.request(originalRequest);
    }
  },
);

export default instance;
