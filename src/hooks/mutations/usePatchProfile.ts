import memberApi from '@apis/member/memberApi';
import { useRouter } from 'next/router';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

export const usePatchProfile = () => {
  const router = useRouter();
  return useMutation<void, void, string, unknown>(
    (nickname: string) => memberApi.patchNickname(nickname),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['useGetProfile'],
        });
        router.replace('/my');
      },
    },
  );
};
