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
  return useQuery<Shop, Error>(
    ['useGetShopDetail'],
    () => shopApi.getShopsInRad(lat, lng, brd),
    {
      refetchOnWindowFocus: false,
    },
  );
};
