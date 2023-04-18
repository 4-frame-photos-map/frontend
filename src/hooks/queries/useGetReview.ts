import reviewApi from '@apis/review/reviewApi';
import { getLocalStorage } from '@utils/localStorage';
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

export const useGetAllShopReviews = (shopId: number) => {
  return useQuery<Review[], Error>(
    ['useGetAllShopReviews'],
    () => reviewApi.getAllShopReviews(shopId),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!shopId && !!getLocalStorage('@token'),
    },
  );
};
