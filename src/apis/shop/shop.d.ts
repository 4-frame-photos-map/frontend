type Shop = {
  id: number;
  place_name: string;
  longitude: number;
  latitude: number;
  distance: string;
  place_url: string;
  star_rating_avg: number;
  review_cnt: number;
  can_be_added_to_favorites: boolean;
};

type ShopDetail = {
  id: number;
  place_name: string;
  road_address_name: string;
  distance: string;
  place_url: string;
  star_rating_avg: number;
  review_cnt: number;
  favorite: boolean;
  latitude: string;
  longitude: string;
  recent_reviews: ShopReviewProps[];
};

type ShopReviewProps = {
  id: number;
  create_date: string;
  modify_date: string;
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
