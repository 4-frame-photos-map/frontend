import favoriteApi from '@apis/favorite/favoriteApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

export const useDeleteFavorite = () => {
  return useMutation<void, void, number, unknown>(
    (shopId: number) => favoriteApi.delFavorites(shopId),
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: ['useGetFavorites'],
          });
          queryClient.invalidateQueries({
            queryKey: ['useGetShopDetail'],
          });
        }, 1000);
      },
    },
  );
};
