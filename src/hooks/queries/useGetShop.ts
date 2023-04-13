import shopApi from '@apis/shop/shopApi';
import { queryClient } from 'pages/_app';
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

export const useGetShopsByKeyword = (
  keyword: string,
  lng: number,
  lat: number,
) => {
  return useQuery<Shop[], Error>(
    ['useGetShopsByKeyword', keyword],
    () => shopApi.getShopsByKeyword(keyword, lat, lng),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetShopsByKeyword'],
        });
      },
      enabled: !!keyword,
      refetchOnWindowFocus: false,
      select: (data) =>
        data?.filter(
          (shop) =>
            shop.place_name.includes('인생네컷') ||
            shop.place_name.includes('하루필름') ||
            shop.place_name.includes('포토시그니처') ||
            shop.place_name.includes('포토그레이') ||
            shop.place_name.includes('포토이즘'),
        ),
    },
  );
};
