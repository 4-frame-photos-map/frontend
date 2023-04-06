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
    const { data } = response;
    const UnAuthorizeError = data.error.error_code === '100';
    const InvalidTokenError = data.error.error_code === '101';
    const ExpiredTokenError = data.error.error_code === '102';

    if (UnAuthorizeError) {
      alert('세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
      window.location.href = `${CONFIG.LOCAL}/auth/login`;
      return;
    }
    if (InvalidTokenError) {
      alert('유효하지 않은 토큰입니다. 다시 로그인해 주시기 바랍니다.');
      window.location.href = `${CONFIG.LOCAL}/auth/login`;
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
