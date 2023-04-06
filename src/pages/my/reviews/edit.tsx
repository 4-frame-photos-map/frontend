import usePatchReview from '@hooks/usePatchReview';
import { useGetUserReview } from '@hooks/useGetReview';
import tw from 'tailwind-styled-components';
import Button from '@components/common/Button';
import Checkbox from '@components/common/Checkbox';
import ShopLayout from '@components/common/ShopLayout';
import Textarea from '@components/common/Textarea';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type ReviewForm = {
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
  const [rate, setRate] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isEditStar, setIsEditStar] = useState<boolean>(false);

  const { register, handleSubmit, watch, setValue } = useForm<ReviewForm>();

  useEffect(() => {
    if (review) {
      setValue('content', review.content);
      setValue('item', review.item);
      setValue('purity', review.purity);
      setValue('retouch', review.retouch);
      rate.fill(true, 0, review.star_rating);
    }
  }, [review]);

  const watchContent = watch('content');
  const watchItem = watch('item');
  const watchPurity = watch('purity');
  const watchRetouch = watch('retouch');

  const handleStarClick = (index: number) => {
    if (!isEditStar) {
      setIsEditStar(true);
    }
    const clickStates = [...rate];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setRate(clickStates);
  };

  const onSubmit = (form) => {
    const { content, item, purity, retouch } = form;
    const reviewInfo = [
      reviewId,
      {
        star_rating: rate.filter(Boolean).length,
        content,
        item,
        purity,
        retouch,
      },
    ];
    patchReview(reviewInfo);
  };

  return (
    <ShopLayout className="bg-white">
      <RatingContainer>
        <span className="pb-6 text-title2 font-semibold">이용 후기 작성</span>
        <div className="flex text-label2">
          <span className="text-status-error">*</span>
          <span className="pl-2 pb-4 text-text-alternative">
            해당 표시는 필수 사항이에요.
          </span>
        </div>
        <div className="flex">
          {isEditStar
            ? STAR.map((ele) => (
                <div key={ele} onClick={() => handleStarClick(ele)}>
                  <Image
                    src={
                      rate[ele]
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
              rate.fill(true, 0, review.star_rating).map((_, idx) => (
                <div key={idx} onClick={() => handleStarClick(idx)}>
                  <Image
                    src={
                      rate[idx]
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
            setValue={setValue}
            defaultValue="GOOD"
            status={watchItem}
          />
          <Checkbox
            id="purity"
            label="청결상태"
            leftValue="좋음"
            rightValue="나쁨"
            setValue={setValue}
            status={watchPurity}
          />
          <Checkbox
            id="retouch"
            label="보정도"
            leftValue="높음"
            rightValue="낮음"
            setValue={setValue}
            status={watchRetouch}
          />
        </OptionBox>
        <Textarea
          label="이용후기"
          placeholder="리뷰를 남겨주세요! (100자 이내)"
          register={register('content')}
          className={
            watchContent ? 'border-primary-pressed' : 'border-text-assitive'
          }
        />
      </OptionContainer>
      <Button
        text="작성 취소하기"
        isRightButton={true}
        handleButton={() => {
          router.back();
        }}
        handleRightButton={handleSubmit(onSubmit)}
        disabled={!rate.filter(Boolean).length || !watchContent}
      />
    </ShopLayout>
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
