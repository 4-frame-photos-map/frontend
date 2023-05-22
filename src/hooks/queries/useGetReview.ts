import reviewApi from '@apis/review/reviewApi';
import { useQuery } from 'react-query';

export const useGetAllUserReviews = () => {
  return useQuery<Review[], Error>(
    ['useGetAllUserReviews'],
    () => reviewApi.getAllUserReviews(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};

export const useGetUserReview = (reviewId: number) => {
  return useQuery<Review, Error>(
    ['useGetUserReview'],
    () => reviewApi.getReview(reviewId),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!reviewId,
    },
  );
};
