import Image from 'next/image';
import { useRef, useState } from 'react';
import { QueryClient, dehydrate } from 'react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useGetShopDetail } from '@hooks/queries/useGetShop';
import { useGetAllShopReviews } from '@hooks/queries/useGetReview';
import shopApi from '@apis/shop/shopApi';
import NavBar from '@components/common/NavBar';
import ShopLayout from '@components/layout/ShopLayout';
import ReviewItem from '@components/common/ReviewItem';
import StarRate from '@components/common/StarRate';
import tw from 'tailwind-styled-components';
import Button from '@components/common/Button';
import BrandTag from '@components/common/BrandTag';
import Scripts from '@components/common/Scripts';

const ShopDetail = ({ shopId, distance }) => {
  const router = useRouter();
  const mapContainer = useRef<HTMLDivElement>(null);

  const [reviewLoaded, setReviewLoaded] = useState<boolean>(false);

  const { data: shopInfo } = useGetShopDetail(shopId, distance);
  const { data: additionalReview } = useGetAllShopReviews(shopId);

  console.log(shopInfo);
  return (
    <ShopLayout className="bg-white pt-[62px]">
      {shopInfo && <Scripts shopInfo={shopInfo} mapContainer={mapContainer} />}
      <Map ref={mapContainer}></Map>
      <NavBar
        isLeft={true}
        isDetail={true}
        shopId={shopInfo?.id}
        isFavorite={shopInfo?.favorite}
      />
      <ShopInfoBox>
        <ShopTagBox>
          <BrandTag name={shopInfo?.place_name as string} />
        </ShopTagBox>
        <ShopName>{shopInfo?.place_name}</ShopName>
        <ShopRate>
          <div className="flex items-center">
            {shopInfo && <StarRate rate={shopInfo?.star_rating_avg} />}
            <div className="pl-1 pr-2">
              {shopInfo?.star_rating_avg} ({shopInfo?.review_cnt})
            </div>
            <div className="border-l border-text-alternative px-2">
              <span>찜</span>
              <span className="pl-1 font-semibold">
                {shopInfo?.favorite_cnt}
              </span>
            </div>
          </div>
          <div>{shopInfo?.distance.replaceAll('"', '')}</div>
        </ShopRate>
        <ShopEventBox>
          <ShopEvent
            onClick={() => {
              if (shopInfo) {
                router.push(shopInfo.place_url);
              }
            }}
          >
            <Image src={'/svg/map.svg'} width={18} height={18} alt="지도" />
            <div className="pl-[2px]">카카오맵 보러가기</div>
          </ShopEvent>
          <ShopEvent>
            <Image src={'/svg/share.svg'} width={18} height={18} alt="공유" />
            <div className="pl-[2px]">공유하기</div>
          </ShopEvent>
        </ShopEventBox>
        <ReviewInfoBox>
          <span>리뷰 {shopInfo?.review_cnt}개</span>
          {shopInfo && (
            <StarRate color={true} rate={shopInfo.star_rating_avg} />
          )}
        </ReviewInfoBox>
        {!reviewLoaded
          ? shopInfo?.recent_reviews.map(({ review_info, member_info }) => (
              <ReviewItem
                key={review_info.id}
                create_date={review_info.create_date}
                star_rating={review_info.star_rating}
                content={review_info.content}
                purity={review_info.purity}
                retouch={review_info.retouch}
                item={review_info.item}
                member_info={member_info as member_info}
              />
            ))
          : additionalReview?.map(({ review_info, member_info }) => (
              <ReviewItem
                key={review_info.id}
                create_date={review_info.create_date}
                star_rating={review_info.star_rating}
                content={review_info.content}
                purity={review_info.purity}
                retouch={review_info.retouch}
                item={review_info.item}
                member_info={member_info as member_info}
              />
            ))}
        {!reviewLoaded && (shopInfo?.review_cnt as number) > 3 && (
          <LoadReviewBtn
            onClick={() => {
              setReviewLoaded(true);
            }}
          >
            <Image src={'/svg/plus.svg'} width={18} height={18} alt="더보기" />
            <span>리뷰 전체 불러오기</span>
          </LoadReviewBtn>
        )}
      </ShopInfoBox>
      <Button
        handleButton={() =>
          router.push(`/shopDetail/review?shopId=${shopInfo?.id}`)
        }
      />
    </ShopLayout>
  );
};

const Map = tw.div`
h-[270px] w-full pt-[62px]
`;
const ShopInfoBox = tw.div`
flex flex-col px-4 pt-4 pb-2 mb-[52px]
`;
const ShopTagBox = tw.div`
mb-2 text-caption2
`;
const ShopName = tw.div`
text-title1 font-semibold
`;
const ShopEventBox = tw.div`
flex justify-between gap-2 py-4 text-label1
`;
const ShopEvent = tw.div`
flex w-full cursor-pointer items-center justify-center rounded-[100px] border border-[#333333] py-2 px-3
`;
const ReviewInfoBox = tw.div`
flex flex-col py-6 text-body1 font-semibold
`;
const ShopRate = tw.div`
flex justify-between py-2 text-caption1
`;
const LoadReviewBtn = tw.button`
flex w-full items-center justify-center gap-1 rounded-[100px] border border-primary-normal py-2 text-center text-label1
`;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { shopId, distance } = query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['useGetShopDetail'], () =>
    shopApi.getShopDetail(Number(shopId), String(distance)),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      shopId: Number(shopId),
      distance: String(distance),
    },
  };
};

export default ShopDetail;
