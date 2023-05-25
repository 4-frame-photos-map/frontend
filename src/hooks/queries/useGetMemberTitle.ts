import titleApi from '@apis/title/titleApi';
import { useQuery } from 'react-query';

export const useGetAllTitles = () => {
  return useQuery<MemberTitle, Error>(
    ['useGetAllTitles'],
    () => titleApi.getAllTitles(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};
