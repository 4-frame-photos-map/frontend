import tw from 'tailwind-styled-components';
import Checkbox from '@components/common/Checkbox';
import ReviewLayout from '@components/layout/ReviewLayout';
import Textarea from '@components/common/Textarea';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Button from '@components/common/Button';
import usePostReview from '@hooks/mutations/usePostReview';
import Seo from '@components/common/Seo';

type ReviewForm = {
  star_rating?: number;
  content?: string;
  purity?: string;
  retouch?: string;
  item?: string;
};

const STAR = [0, 1, 2, 3, 4];

const Review = () => {
  const router = useRouter();
  const shopId = Number(router.query.shopId);
  const { mutate } = usePostReview();

  const { register, handleSubmit, watch, setValue } = useForm<ReviewForm>();

  const watchStar = watch('star_rating');
  const watchContent = watch('content');
  const watchItem = watch('item');
  const watchPurity = watch('purity');
  const watchRetouch = watch('retouch');

  const handleStarClick = (index: number) => {
    setValue('star_rating', index + 1);
  };

  const onSubmit = (form) => {
    const { content, item, purity, retouch, star_rating } = form;
    const reviewInfo = [
      shopId,
      {
        star_rating,
        content,
        item,
        purity,
        retouch,
      },
    ];
    mutate(reviewInfo);
  };

  return (
    <ReviewLayout className="bg-white">
      <Seo title="리뷰 작성" url="shopDetail/review" />
      <RatingContainer>
        <span className="pb-6 text-title2 font-semibold">이용 리뷰 작성</span>
        <div className="flex text-label2">
          <span className="text-status-error">*</span>
          <span className="pb-4 pl-2 text-text-alternative">
            해당 표시는 필수 사항이에요.
          </span>
        </div>
        <div className="flex">
          {STAR.map((ele) => (
            <div key={ele} onClick={() => handleStarClick(ele)}>
              <Image
                src={
                  (watch('star_rating') as number) > ele
                    ? '/svg/checked_star.svg'
                    : '/svg/blank_star.svg'
                }
                width={40}
                height={40}
                className="cursor-pointer"
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
            label="보정정도"
            leftValue="높음"
            rightValue="낮음"
            setValue={setValue}
            status={watchRetouch}
          />
        </OptionBox>
        <Textarea
          label="이용리뷰"
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
        disabled={!watchStar || !watchContent || watchContent.trim() === ''}
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

export default Review;
