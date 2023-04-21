import favoriteApi from '@apis/favorite/favoriteApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

export const usePostFavorite = () => {
  return useMutation<void, void, number, unknown>(
    (shopId: number) => favoriteApi.postFavorites(shopId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetFavorites'],
        });
        queryClient.invalidateQueries({
          queryKey: ['useGetShopDetail'],
        });
        queryClient.invalidateQueries({
          queryKey: ['useGetShopsInRad'],
        });
      },
    },
  );
};
