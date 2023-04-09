type Shop = ShopProps & {
  favorite_cnt: number;
  brand: BrandProps[];
};

type ShopDetail = ShopProps & {
  road_address_name: string;
  recent_reviews: ShopReviewProps[];
};

type ShopProps = {
  id: number;
  place_name: string;
  longitude: string;
  latitude: string;
  distance: string;
  place_url: string;
  star_rating_avg: number;
  review_cnt: number;
  favorite_cnt: number;
  favorite: boolean;
};

type ShopReviewProps = {
  id: number;
  create_date: number[];
  modify_date: number[];
  star_rating: number;
  content: string;
  purity: string;
  retouch: string;
  item: string;
  member_info: {
    id: number;
    nickname: string;
  };
};

type BrandProps = {
  id: number;
  brand_name: string;
  file_path: string;
};
