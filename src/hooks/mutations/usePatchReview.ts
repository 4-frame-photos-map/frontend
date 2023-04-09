import { useRouter } from 'next/router';
import reviewApi from '@apis/review/reviewApi';
import { useMutation } from 'react-query';

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

const usePatchReview = () => {
  const router = useRouter();
  return useMutation<TResponse, Error, Data>(
    'usePatchReview',
    (formData: any) => reviewApi.patchReview(formData[0], formData[1]),
    {
      onSuccess: () => {
        router.push('/my/reviews');
      },
    },
  );
};

export default usePatchReview;
