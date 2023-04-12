import shopApi from '@apis/shop/shopApi';
import { useQuery } from 'react-query';

export const useGetShopDetail = (shopId: number, distance: string) => {
  return useQuery<ShopDetail, Error>(
    ['useGetShopDetail'],
    () => shopApi.getShopDetail(shopId, distance),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!distance,
    },
  );
};

export const useGetShopsInRad = (lat: number, lng: number, brd?: string) => {
  return useQuery<Shop[], Error>(
    ['useGetShopsInRad', brd, lat, lng],
    () => shopApi.getShopsInRad(lat, lng, brd),
    {
      refetchOnWindowFocus: false,
      enabled: !!lat,
      select: (shops) => {
        if (brd) {
          const selected = shops.filter((shops) =>
            shops.place_name.includes(brd),
          );
          return selected;
        } else {
          return shops;
        }
      },
    },
  );
};
