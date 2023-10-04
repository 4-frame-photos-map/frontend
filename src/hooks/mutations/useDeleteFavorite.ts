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
  '/location': {
    queryKey: 'useGetShopDetail',
    convertFunc: (old) => {
      return {
        ...old,
        favorite: false,
      };
    },
  },
};

export const useDeleteFavorite = (path: string) => {
  return useMutation<void, void, number, unknown>(
    'useDeleteFavorite',
    (shopId: number) => favoriteApi.delFavorites(shopId),
    {
      onMutate: async (shopId) => {
        await queryClient.cancelQueries({ queryKey: ['useDeleteFavorite'] });
        const previousValue = queryClient.getQueryData([
          Querykey[path].queryKey,
        ]);
        queryClient.setQueryData([Querykey[path].queryKey], (old: any) =>
          Querykey[path].convertFunc(old, shopId),
        );
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueryData(
          [Querykey[path].queryKey],
          context.previousValue,
        );
      },
      onSettled: (_, error, shopId) => {
        if (!error) {
          queryClient.invalidateQueries({
            queryKey: [Querykey[path].queryKey, shopId],
          });
        }
      },
    },
  );
};
