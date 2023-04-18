import favoriteApi from '@apis/favorite/favoriteApi';
import { getToken } from '@utils/token';
import { useQuery } from 'react-query';

export const useGetFavorite = (lng: number, lat: number, sort: string) => {
  return useQuery<Favorite[], Error>(
    ['useGetFavorites'],
    () => favoriteApi.getAllFavorites(lng, lat, sort),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};
