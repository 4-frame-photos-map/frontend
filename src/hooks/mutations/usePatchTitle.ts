import memberApi from '@apis/member/memberApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

export const usePatchTitle = () => {
  return useMutation<void, void, number, unknown>(
    'usePatchTitle',
    (titleId: number) => memberApi.patchTitle(titleId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useGetAllTitles'] });
        const previousValue = queryClient.getQueryData(['useGetAllTitles']);
        queryClient.setQueryData(['useGetAllTitles'], (old: any) => {
          return {
            ...old,
            is_main: true,
          };
        });
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueriesData(['useGetAllTitles'], context.previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: 'useGetAllTitles',
        });
      },
    },
  );
};
