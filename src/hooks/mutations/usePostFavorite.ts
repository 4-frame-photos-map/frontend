import favoriteApi from '@apis/favorite/favoriteApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

export const usePostFavorite = () => {
  return useMutation<void, void, number, unknown>(
    'usePostFavorite',
    (shopId: number) => favoriteApi.postFavorites(shopId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries('usePostFavorite');
        const previousValue = queryClient.getQueryData(['useGetShopDetail']);
        queryClient.setQueryData('useGetShopDetail', (old: any) => {
          return {
            ...old,
            favorite: true,
          };
        });
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueryData('useGetShopDetail', context.previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: 'useGetShopDetail',
        });
      },
    },
  );
};
