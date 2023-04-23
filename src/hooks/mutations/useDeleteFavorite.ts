import favoriteApi from '@apis/favorite/favoriteApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

const Querykey = {
  '/wish': {
    queryKey: 'useGetFavorites',
    convertFunc: (old: any, shopId: number) =>
      old.filter((t) => t.shop.id !== shopId),
  },
  '/home': {
    queryKey: 'useGetShopDetail',
    convertFunc: () => {
      return;
    },
  },
  '/shopDetail': {
    queryKey: 'useGetShopDetail',
    convertFunc: (old) => {
      return {
        ...old,
        favorite: false,
      };
    },
  },
};

export const useDeleteFavorite = (path: any) => {
  return useMutation<void, void, number, unknown>(
    'useDeleteFavorite',
    (shopId: number) => favoriteApi.delFavorites(shopId),
    {
      onMutate: async (shopId) => {
        await queryClient.cancelQueries({ queryKey: ['useDeleteFavorite'] });
        const previousValue = queryClient.getQueryData([
          Querykey[path].queryKey,
        ]);
        queryClient.setQueriesData([Querykey[path].queryKey], (old: any) =>
          Querykey[path].convertFunc(old, shopId),
        );
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueriesData(
          [Querykey[path].queryKey],
          context.previousValue,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [Querykey[path].queryKey],
        });
      },
    },
  );
};
