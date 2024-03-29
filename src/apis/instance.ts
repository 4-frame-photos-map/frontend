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
    const UnAuthorizeError = data.error_code === '100';
    const InvalidTokenError = data.error_code === '101';
    const ExpiredAccessTokenError = data.error_code === '102';
    const ExpiredRefreshTokenError = data.error_code === '103';
    const RefreshTokenError = data.error_code === '104';
    const ClientError = '400' <= data.error_code && data.error_code < '500';

    if (ExpiredRefreshTokenError || RefreshTokenError) {
      alert('세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
      if (CONFIG.ENV === 'development') {
        window.location.href = `${CONFIG.LOCAL}/auth/login`;
      } else if (CONFIG.ENV === 'production') {
        window.location.href = `${CONFIG.DOMAIN}/auth/login`;
      }
    }
    if (UnAuthorizeError || InvalidTokenError) {
      alert('유효하지 않은 토큰입니다. 다시 로그인해 주시기 바랍니다.');
      if (CONFIG.ENV === 'development') {
        window.location.href = `${CONFIG.LOCAL}/auth/login`;
      } else if (CONFIG.ENV === 'production') {
        window.location.href = `${CONFIG.DOMAIN}/auth/login`;
      }
    }
    if (ExpiredAccessTokenError) {
      const accessToken = await ReissueToken();
      setToken({
        accessToken,
        refreshToken: getToken().refreshToken,
      });
      return instance.request(originalRequest);
    }
    if (ClientError) {
      alert(`${data.error_message}`);
    }
  },
);

export default instance;
