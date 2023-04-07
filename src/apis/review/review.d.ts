type Review = ReviewInfo & {
  id: number;
  create_date: number[];
  modify_date: number[];
  member_info: {
    id: number;
    nickname: string;
  };
  shop_info: {
    id: number;
    brand: string;
    place_name: string;
    road_address_name: string;
  };
};

type ReviewInfo = {
  star_rating: number;
  content: string;
  purity?: string;
  retouch?: string;
  item?: string;
};
