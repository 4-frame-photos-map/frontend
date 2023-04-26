type Review = {
  review_info: {
    id: number;
    create_date: number[];
    modify_date: number[];
    star_rating: number;
    content: string;
    purity?: string;
    retouch?: string;
    item?: string;
  };
  member_info: member_info;
  shop_info: shop_info;
};

type ReviewInfoProps = {
  star_rating: number;
  content: string;
  purity?: string;
  retouch?: string;
  item?: string;
};

type member_info = {
  id: number;
  nickname: string;
};

type shop_info = {
  id: number;
  brand: string;
  place_name: string;
};
