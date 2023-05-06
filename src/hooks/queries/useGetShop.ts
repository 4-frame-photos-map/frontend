import shopApi from '@apis/shop/shopApi';
import { useQuery } from 'react-query';

export const useGetShopDetail = (shopId: number, lat: number, lng: number) => {
  return useQuery<ShopDetail, Error>(
    ['useGetShopDetail', shopId],
    () => shopApi.getShopDetail(shopId, lat, lng),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!lat && !!shopId,
    },
  );
};

export const useGetShopsInRad = (
  lat: number,
  lng: number,
  mapLat: number,
  mapLng: number,
  brd?: string,
  radius?: number,
) => {
  return useQuery<ShopInRad, Error>(
    ['useGetShopsInRad', mapLat, mapLng],
    () => shopApi.getShopsInRad(lat, lng, mapLat, mapLng, brd, radius),
    {
      refetchOnWindowFocus: false,
      enabled: !!lat && !!mapLat,
    },
  );
};

export const useGetShopsByKeyword = (
  keyword: string,
  lng: number,
  lat: number,
) => {
  return useQuery<Shop[], Error>(
    ['useGetShopsByKeyword', keyword],
    () => shopApi.getShopsByKeyword(keyword, lat, lng),
    {
      enabled: !!keyword,
      refetchOnWindowFocus: false,
    },
  );
};
