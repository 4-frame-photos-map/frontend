type Member = {
  id: number;
  nickname: string;
  main_member_title: string;
  member_title_cnt: number;
};

type QuitMember = {
  id: number;
};

type Validate = {
  nickname: string;
  status: boolean;
};
