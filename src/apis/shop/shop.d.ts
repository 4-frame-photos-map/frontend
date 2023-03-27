type ShopProps = {
  id: number;
  placeName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
  distance: string;
  canBeAddedToFavorites: boolean;
};

type ShopDetailProps = {
  id: number;
  placeName: string;
  roadAddressName: string;
  distance: string;
  placeUrl: string;
  canBeAddedToFavorites: boolean;
  shopTitles: null;
};

type Shop = TResponse & {
  result: ShopProps[];
};

type ShopDetail = TResponse & {
  result: ShopDetailProps;
};
