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
