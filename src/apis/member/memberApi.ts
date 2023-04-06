import instance from '@apis/instance';

class MemberApi {
  getProfile = async (): Promise<Member> => {
    const { data } = await instance.get(`/member/info`);
    return data;
  };

  patchNickname = async (nickname: string): Promise<void> => {
    const { data } = await instance.patch(`/member/info`, {
      nickname,
    });
    return data;
  };

  delAccount = async (): Promise<QuitMember> => {
    const { data } = await instance.delete(`/member`);
    return data;
  };

  patchTitle = async (titleId: number): Promise<void> => {
    const { data } = await instance.patch(`/member/main-title/${titleId}`);
    return data;
  };
}

const memberApi = new MemberApi();

export default memberApi;
