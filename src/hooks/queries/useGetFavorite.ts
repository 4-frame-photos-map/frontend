import favoriteApi from '@apis/favorite/favoriteApi';
import { useQuery } from 'react-query';

export const useGetFavorite = (lng: number, lat: number) => {
  return useQuery<Favorite[], Error>(
    ['useGetFavorites'],
    () => favoriteApi.getAllFavorites(lng, lat),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};
