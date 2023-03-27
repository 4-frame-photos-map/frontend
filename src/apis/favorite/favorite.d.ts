type FavoriteProps = {
  id: number;
  shop: {
    id: number;
    placeName: string;
    roadAddressName: string;
  };
};

type Favorite = TResponse & {
  result: FavoriteProps[];
};
