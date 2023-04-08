import favoriteApi from '@apis/favorite/favoriteApi';
import { queryClient } from 'pages/_app';
import { useMutation, useQueryClient } from 'react-query';

export const usePostFavorites = () => {
  return useMutation<void, void, number, unknown>(
    (shopId: number) => favoriteApi.postFavorites(shopId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetFavorites'],
        });
      },
      onError: () => {
        console.log('error');
      },
    },
  );
};
