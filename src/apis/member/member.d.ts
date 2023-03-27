type MemberProps = {
  id: number;
  nickname: string;
  member_title_cnt: number;
};

type QuitMember = TResponse & {
  result: {
    id: number;
  };
};

type Member = TResponse & {
  result: MemberProps;
};
