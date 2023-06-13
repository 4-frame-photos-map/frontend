import instance from '@apis/instance';

class MemberApi {
  getProfile = async (): Promise<Member> => {
    const { data } = await instance.get(`/member/info`);
    return data;
  };

  getNicknameValidate = async (nickname: string): Promise<Validate> => {
    const { data } = await instance.get(
      `/member/nickname?nickname=${nickname}`,
    );
    return data;
  };

  patchNickname = async (nickname: string): Promise<void> => {
    return await instance.patch(`/member/nickname`, {
      nickname,
    });
  };

  delAccount = async (): Promise<QuitMember> => {
    const { data } = await instance.delete(`/member`);
    return data;
  };

  patchTitle = async (titleId: number): Promise<void> => {
    return await instance.patch(`/member/main-title/${titleId}`);
  };
}

const memberApi = new MemberApi();

export default memberApi;
