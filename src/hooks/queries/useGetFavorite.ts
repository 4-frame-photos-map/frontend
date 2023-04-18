import favoriteApi from '@apis/favorite/favoriteApi';
import { getLocalStorage } from '@utils/localStorage';
import { getToken } from '@utils/token';
import { useQuery } from 'react-query';

export const useGetFavorite = (lng: number, lat: number, sort: string) => {
  return useQuery<Favorite[], Error>(
    ['useGetFavorites'],
    () => favoriteApi.getAllFavorites(lng, lat, sort),
    {
      enabled: !!getToken().accessToken,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};
