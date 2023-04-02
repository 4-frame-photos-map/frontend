import shopApi from '@apis/shop/shopApi';
import { useQuery } from 'react-query';

export const useGetShopsInRad = (lat: number, lng: number, brd?: string) => {
  return useQuery<Shop, Error>(
    ['useGetShopDetail'],
    () => shopApi.getShopsInRad(lat, lng, brd),
    {
      refetchOnWindowFocus: false,
    },
  );
};
