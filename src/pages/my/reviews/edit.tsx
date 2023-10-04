import usePatchReview from '@hooks/mutations/usePatchReview';
import { useGetUserReview } from '@hooks/queries/useGetReview';
import tw from 'tailwind-styled-components';
import Button from '@components/common/Button';
import Checkbox from '@components/common/Checkbox';
import ReviewLayout from '@components/layout/ReviewLayout';
import Textarea from '@components/common/Textarea';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Seo from '@components/common/Seo';

type ReviewForm = {
  star_rating?: number;
  content?: string;
  purity?: string;
  retouch?: string;
  item?: string;
};
const STAR = [0, 1, 2, 3, 4];

const Edit = () => {
  const router = useRouter();
  const reviewId = Number(router.query.reviewId);
  const { data: review } = useGetUserReview(reviewId);
  const { mutate: patchReview } = usePatchReview();
  const [isEditStar, setIsEditStar] = useState<boolean>(false);
  const [isItemSet, setIsItemSet] = useState<boolean>(true);
  const [isPuritySet, setIsPuritySet] = useState<boolean>(true);
  const [isRetouchSet, setIsRetouchSet] = useState<boolean>(true);
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<ReviewForm>();

  useEffect(() => {
    if (review) {
      reset(review.review_info);
    }
  }, [review, reset, setValue]);

  const watchContent = watch('content');
  const watchItem = watch('item');
  const watchPurity = watch('purity');
  const watchRetouch = watch('retouch');

  const handleStarClick = (index: number) => {
    if (!isEditStar) {
      setIsEditStar(true);
    }
    setValue('star_rating', index + 1);
  };

  const onSubmit = (form) => {
    const { content, item, purity, retouch, star_rating } = form;
    const reviewInfo = [
      reviewId,
      {
        star_rating,
        content,
        item,
        purity,
        retouch,
      },
    ];
    patchReview(reviewInfo);
  };

  return (
    <ReviewLayout className="bg-white">
      <Seo title="리뷰 수정" url="my/reviews/edit" />
      <RatingContainer>
        <span className="pb-6 text-title2 font-semibold">이용 리뷰 작성</span>
        <div className="flex text-label2">
          <span className="text-status-error">*</span>
          <span className="pb-4 pl-2 text-text-alternative">
            해당 표시는 필수 사항이에요.
          </span>
        </div>
        <div className="flex">
          {isEditStar
            ? STAR.map((ele) => (
                <div key={ele} onClick={() => handleStarClick(ele)}>
                  <Image
                    src={
                      (watch('star_rating') as number) > ele
                        ? '/svg/checked_star.svg'
                        : '/svg/blank_star.svg'
                    }
                    width={40}
                    height={40}
                    alt="별"
                  />
                </div>
              ))
            : review &&
              Array.from({ length: 5 }, (_, index) => index).map((_, idx) => (
                <div key={idx} onClick={() => handleStarClick(idx)}>
                  <Image
                    src={
                      (watch('star_rating') as number) > idx
                        ? '/svg/default_star.svg'
                        : '/svg/blank_star.svg'
                    }
                    width={40}
                    height={40}
                    alt="별"
                  />
                </div>
              ))}
          <span className="text-status-error">*</span>
        </div>
      </RatingContainer>
      <OptionContainer>
        <OptionBox>
          <Checkbox
            id="item"
            label="악세사리"
            leftValue="많음"
            rightValue="적음"
            isSet={isItemSet}
            setValue={setValue}
            setIsSet={setIsItemSet}
            status={watchItem}
          />
          <Checkbox
            id="purity"
            label="청결상태"
            leftValue="좋음"
            rightValue="나쁨"
            isSet={isPuritySet}
            setValue={setValue}
            setIsSet={setIsPuritySet}
            status={watchPurity}
          />
          <Checkbox
            id="retouch"
            label="보정도"
            leftValue="높음"
            rightValue="낮음"
            isSet={isRetouchSet}
            setValue={setValue}
            setIsSet={setIsRetouchSet}
            status={watchRetouch}
          />
        </OptionBox>
        <Textarea
          label="이용리뷰"
          placeholder="리뷰를 남겨주세요! (100자 이내)"
          register={register('content')}
          className={
            watchContent && watchContent !== review?.review_info.content
              ? 'border-primary-pressed'
              : 'border-text-assitive text-text-assitive'
          }
        />
      </OptionContainer>
      <Button
        text="작성 취소하기"
        isRightButton={true}
        disabled={!watchContent || watchContent.trim() === ''}
        handleButton={() => {
          router.replace('/my/reviews');
        }}
        handleRightButton={handleSubmit(onSubmit)}
      />
    </ReviewLayout>
  );
};

const RatingContainer = tw.section`
flex flex-col items-center justify-center pt-8
`;
const OptionContainer = tw.section`
mt-4 px-6
`;
const OptionBox = tw.div`
mb-4 flex flex-col
`;

export default Edit;
