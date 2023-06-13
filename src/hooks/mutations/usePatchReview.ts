import reviewApi from '@apis/review/reviewApi';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

type Data = (number | ReviewInfoProps)[];

const usePatchReview = () => {
  const router = useRouter();
  return useMutation<void, Error, Data>(
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
