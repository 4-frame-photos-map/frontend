import favoriteApi from '@apis/favorite/favoriteApi';
import { useQuery } from 'react-query';

export const useGetFavorites = (lng: number, lat: number, sort: string) => {
  return useQuery<Favorite[], Error>(
    ['useGetFavorites'],
    () => favoriteApi.getAllFavorites(lng, lat, sort),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};
