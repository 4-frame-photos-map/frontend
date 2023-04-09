import reviewApi from '@apis/review/reviewApi';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

type Data = (
  | number
  | {
      star_rating: number;
      content: string;
      item: string;
      purity: string;
      retouch: string;
    }
)[];

const usePostReview = () => {
  const router = useRouter();
  return useMutation<TResponse, Error, Data>(
    'usePostReview',
    (formData: any) => reviewApi.postReview(formData[0], formData[1]),
    {
      onSuccess: () => {
        router.back();
      },
    },
  );
};

export default usePostReview;
