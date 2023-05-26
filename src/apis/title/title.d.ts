type MemberTitle = {
  holding_count: number;
  main_member_title: {
    id: number;
    name: string;
    standard: string;
    content: string;
    image_url: string;
    is_holding: boolean;
    is_main: boolean;
  };
  member_titles: [
    {
      id: number;
      name: string;
      standard: string;
      content: string;
      image_url: string;
      is_holding: boolean;
      is_main: boolean;
    },
  ];
};

type ShopTitle = {
  name: string;
  conditions: string;
  content: string;
};
