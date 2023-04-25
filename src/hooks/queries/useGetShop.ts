import shopApi from '@apis/shop/shopApi';
import { queryClient } from 'pages/_app';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export const useGetShopDetail = (shopId: number, distance: string) => {
  return useQuery<ShopDetail, Error>(
    ['useGetShopDetail', shopId],
    () => shopApi.getShopDetail(shopId, distance),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!distance,
    },
  );
};

export const useGetShopsInRad = (
  lat: number,
  lng: number,
  mapLat: number,
  mapLng: number,
  brd?: string,
) => {
  return useQuery<ShopInRad, Error>(
    ['useGetShopsInRad', brd, mapLat, mapLng],
    () => shopApi.getShopsInRad(lat, lng, mapLat, mapLng, brd),
    {
      refetchOnWindowFocus: false,
      enabled: !!lat,
    },
  );
};

export const useGetShopsByKeyword = (
  keyword: string,
  lng: number,
  lat: number,
) => {
  useEffect(() => {
    if (keyword) {
      shopApi.getShopsByKeyword(keyword, lat, lng).then(() => {
        queryClient.invalidateQueries({
          queryKey: ['useGetShopsByKeyword'],
        });
      });
    }
  }, [keyword]);

  return useQuery<Shop[], Error>(
    ['useGetShopsByKeyword', keyword],
    () => shopApi.getShopsByKeyword(keyword, lat, lng),
    {
      enabled: !!keyword,
      refetchOnWindowFocus: false,
    },
  );
};
