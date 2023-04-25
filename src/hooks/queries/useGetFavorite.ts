import favoriteApi from '@apis/favorite/favoriteApi';
import { useQuery } from 'react-query';

export const useGetFavorite = (lat: number, lng: number) => {
  return useQuery<Favorite[], Error>(
    ['useGetFavorites'],
    () => favoriteApi.getAllFavorites(lat, lng),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!lat,
    },
  );
};
