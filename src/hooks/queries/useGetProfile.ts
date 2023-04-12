import memberApi from '@apis/member/memberApi';
import { useQuery } from 'react-query';

export const useGetProfile = () => {
  return useQuery<Member, Error>(
    ['useGetProfile'],
    () => memberApi.getProfile(),
    {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
};
