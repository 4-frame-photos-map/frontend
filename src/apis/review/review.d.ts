type ReviewProps = ReviewInfo & {
  id: number;
  create_date: string;
  modify_date: string;
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

type Reviews = TResponse & {
  result: ReviewProps[];
};

type Review = TResponse & {
  result: ReviewProps;
};

type ReviewInfo = {
  star_rating: number;
  content: string;
  purity: string;
  retouch: string;
  item: string;
};
