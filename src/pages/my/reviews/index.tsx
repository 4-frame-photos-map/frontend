import Modal from '@components/common/Modal';
import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';
import ReviewItem from '@components/common/ReviewItem';
import { useDeleteReview } from '@hooks/useDeleteReview';
import { useGetAllUserReviews } from '@hooks/useGetReview';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

const Reviews = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<number>();
  const { data: reviews } = useGetAllUserReviews();
  const { mutate: deleteReview } = useDeleteReview();
  return (
    <PageLayout>
      <NavBar title="내 후기" isLeft={true} />
      <div className="my-[52px]">
        {reviews?.map((review, idx) => (
          <div key={idx}>
            <Modal
              isModal={isModal}
              title="리뷰 삭제"
              message="리뷰 작성 내역을 삭제하시나요?"
              left="아니요"
              right="네"
              leftEvent={() => setIsModal(false)}
              rightEvent={() => {
                deleteReview(reviewId as number);
                setIsModal(false);
              }}
            />
            <ContentBox>
              <div>
                <span className="text-caption1">인생네컷</span>
                <div className="mb-4 text-title1 font-semibold">브랜드</div>
              </div>
              <ReviewItem
                create_date={review.create_date}
                star_rating={review.star_rating}
                content={review.content}
                purity={review.purity}
                retouch={review.retouch}
                item={review.item}
                member_info={review.member_info}
              />
              <BtnContainer>
                <BtnBox
                  onClick={() =>
                    router.push(`/my/reviews/edit?reviewId=${review.id}`)
                  }
                >
                  <Image src={'/svg/pen.svg'} width={18} height={18} alt="펜" />
                  <span className="ml-1">수정하기</span>
                </BtnBox>
                <BtnBox
                  onClick={() => {
                    setReviewId(review.id);
                    setIsModal(true);
                  }}
                >
                  <Image
                    src={'/svg/trash_can.svg'}
                    width={18}
                    height={18}
                    alt="쓰레기통"
                  />
                  <span className="ml-1">삭제하기</span>
                </BtnBox>
              </BtnContainer>
            </ContentBox>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

const ContentBox = tw.div`
mb-2 bg-white pt-4 px-6
`;
const BtnContainer = tw.div`
flex gap-2 pb-4 text-primary-normal
`;
const BtnBox = tw.div`
flex justify-center rounded-[100px] border border-primary-normal py-2 px-4 cursor-pointer
`;

export default Reviews;
