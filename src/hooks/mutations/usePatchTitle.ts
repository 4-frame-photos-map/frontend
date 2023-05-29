import memberApi from '@apis/member/memberApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

export const usePatchTitle = (
  id: number,
  image_url: string,
  name: string,
  is_main: boolean,
) => {
  return useMutation<void, void, number, unknown>(
    'usePatchTitle',
    (titleId: number) => memberApi.patchTitle(titleId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useGetAllTitles'] });
        const previousValue = queryClient.getQueryData(['useGetAllTitles']);

        queryClient.setQueryData<MemberTitle[]>(
          ['useGetAllTitles'],
          (old: any) => {
            const newMainTitle = old.member_titles.map((title) => {
              if (title.id === id) {
                return {
                  ...title,
                  is_main: true,
                };
              }
              return {
                ...title,
                is_main: false,
              };
            });
            return {
              ...old,
              main_member_title: {
                ...old.main_member_title,
                image_url,
                name,
              },
              member_titles: newMainTitle,
            };
          },
        );
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueriesData(['useGetAllTitles'], context.previousValue);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: 'useGetAllTitles',
        });
        queryClient.invalidateQueries({
          queryKey: 'useGetProfile',
        });
      },
    },
  );
};
