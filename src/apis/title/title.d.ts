type MemberTitleProps = {
  id: number;
  name: string;
  content: string;
  status?: 'y' | 'n';
};

type ShopTitleProps = {
  name: string;
  conditions: string;
  content: string;
};

type MemberTitle = TResponse & {
  result: MemberTitleProps;
};

type ShopTitle = TResponse & {
  result: ShopTitleProps[];
};
