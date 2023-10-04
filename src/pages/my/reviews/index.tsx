import Modal from '@components/common/Modal';
import Header from '@components/common/Header';
import PageLayout from '@components/layout/PageLayout';
import ReviewItem from '@components/common/ReviewItem';
import { useDeleteReview } from '@hooks/mutations/useDeleteReview';
import { useGetAllUserReviews } from '@hooks/queries/useGetReview';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import BrandTag from '@components/common/BrandTag';
import Seo from '@components/common/Seo';
import Link from 'next/link';

const Reviews = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<number>();
  const { data: reviews } = useGetAllUserReviews();
  const { mutate: deleteReview } = useDeleteReview();
  return (
    <PageLayout className="bg-bg-primary">
      <Seo title="내 리뷰" url="my/reviews" />
      {isModal && (
        <ModalLayout>
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
        </ModalLayout>
      )}
      <Header centerTitle="내 리뷰" isLeft={true} />
      {reviews && reviews.length ? (
        <ul className="my-[52px]">
          {reviews?.map(({ review_info, shop_info }, idx) => (
            <ContentBox key={idx}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-caption1">
                    <BrandTag name={shop_info?.brand} />
                  </span>
                  <div className="mb-4 cursor-pointer text-title1 font-semibold">
                    <Link href={`/shopDetail?shopId=${shop_info.id}`}>
                      {shop_info.place_name}
                    </Link>
                  </div>
                </div>
                <BtnContainer>
                  <BtnBox
                    onClick={() =>
                      router.replace(
                        `/my/reviews/edit?reviewId=${review_info.id}`,
                      )
                    }
                  >
                    <Image
                      src={'/svg/pen.svg'}
                      width={18}
                      height={16}
                      alt="펜"
                    />
                  </BtnBox>
                  <BtnBox
                    onClick={() => {
                      setReviewId(review_info.id);
                      setIsModal(true);
                    }}
                  >
                    <Image
                      src={'/svg/trash_can.svg'}
                      width={18}
                      height={16}
                      alt="쓰레기통"
                    />
                  </BtnBox>
                </BtnContainer>
              </div>
              <ReviewItem
                create_date={review_info.create_date}
                star_rating={review_info.star_rating}
                content={review_info.content}
                purity={review_info.purity}
                retouch={review_info.retouch}
                item={review_info.item}
              />
            </ContentBox>
          ))}
        </ul>
      ) : (
        <div className="flex h-[100vh] items-center justify-center">
          <span className="text-title2 text-text-alternative">
            작성한 리뷰가 없습니다.
          </span>
        </div>
      )}
    </PageLayout>
  );
};

const ContentBox = tw.li`
mb-2 bg-white pt-4 px-6 list-none
`;
const BtnContainer = tw.div`
flex gap-2 pb-4 text-primary-normal
`;
const BtnBox = tw.div`
flex justify-center rounded-full border border-primary-normal w-8 h-8 cursor-pointer
`;
const ModalLayout = tw.div`
absolute top-0 left-0 w-full h-full
`;

export default Reviews;
