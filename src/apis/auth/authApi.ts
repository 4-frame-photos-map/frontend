import instance from '@apis/instance';

class AuthApi {
  kakaoLogin = async (code: string | null): Promise<Login> => {
    const { data } = await instance.get(`/auth/login/kakao?code=${code}`);
    return data;
  };

  logout = async (): Promise<void> => {
    return await instance.get(`/auth/logout`);
  };

  reissueToken = async (refreshToken: string | undefined): Promise<Reissue> => {
    const { data } = await instance.post(`/auth/token`, {
      refresh_token: refreshToken,
    });
    return data;
  };
}

const authApi = new AuthApi();

export default authApi;
