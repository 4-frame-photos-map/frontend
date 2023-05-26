type Shop = ShopProps & {
  place_address: string;
};

type ShopInRad = ShopProps & {
  address: string;
  shops: ShopProps[];
};

type ShopDetail = ShopProps & {
  recent_reviews: Review[];
};

type ShopProps = {
  id: number;
  place_name: string;
  longitude?: string;
  latitude?: string;
  distance: string;
  place_url: string;
  star_rating_avg: number;
  review_cnt: number;
  favorite_cnt: number;
  brand?: BrandProps;
  favorite: boolean;
  shop_titles?: string[];
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
    main_member_title: string;
  };
};

type BrandProps = {
  id: number;
  brand_name: string;
  file_path: string;
};
