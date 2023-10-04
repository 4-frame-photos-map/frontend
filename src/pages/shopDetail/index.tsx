import Image from 'next/image';
import Header from '@components/common/Header';
import PageLayout from '@components/layout/PageLayout';
import ReviewItem from '@components/common/ReviewItem';
import StarRate from '@components/common/StarRate';
import tw from 'tailwind-styled-components';
import Button from '@components/common/Button';
import BrandTag from '@components/common/BrandTag';
import Scripts from '@components/common/Scripts';
import reviewApi from '@apis/review/reviewApi';
import { curPosState } from '@recoil/positionAtom';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetShopDetail } from '@hooks/queries/useGetShop';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@recoil/userAtom';
import { modalState } from '@recoil/modalAtom';
import ShopTitle from '@components/title/ShopTitle';
import Seo from '@components/common/Seo';

const ShopDetail = () => {
  const router = useRouter();
  const mapContainer = useRef<HTMLDivElement>(null);

  const curPos = useRecoilValue(curPosState);
  const isLogin = useRecoilValue(userState);
  const setIsModal = useSetRecoilState(modalState);

  const shopId = Number(router.query.shopId);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [reviewLoaded, setReviewLoaded] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const { data: shopInfo } = useGetShopDetail(shopId, curPos.lat, curPos.lng);

  const handleShareButton = (
    place_name: string,
    favorite_cnt: number,
    review_cnt: number,
    shopId: number,
  ) => {
    const { Kakao } = window;
    if (isLoaded && Kakao) {
      Kakao.Share.sendDefault({
        objectType: 'location',
        address: place_name,
        addressTitle: place_name,
        content: {
          title: place_name,
          imageUrl: 'https://d18tllc1sxg8cp.cloudfront.net/logo/main_logo.png',
          link: {
            mobileWebUrl: `https://photosmap.vercel.app/shopDetail?shopId=${shopId}`,
            webUrl: `https://photosmap.vercel.app/shopDetail?shopId=${shopId}`,
          },
        },
        social: {
          likeCount: favorite_cnt,
          commentCount: review_cnt,
        },
        buttonTitle: '네컷지도에서 보기',
      });
    }
  };

  return (
    <PageLayout className="bg-white pt-[62px]">
      <Seo title="지점" url="shopDetail" />
      {shopInfo && (
        <Scripts
          shopInfo={shopInfo}
          mapContainer={mapContainer}
          setIsLoaded={setIsLoaded}
        />
      )}
      <Map ref={mapContainer}></Map>
      <Header
        isLeft={true}
        isDetail={true}
        shopId={shopInfo?.id}
        isFavorite={shopInfo?.favorite}
      />
      <ShopInfoBox>
        <ShopTagBox>
          <BrandTag name={shopInfo?.place_name as string} />
          <div className="ml-2 flex">
            {shopInfo?.shop_titles &&
              shopInfo?.shop_titles?.map((title, idx) => (
                <ShopTitle key={idx} title={title} width={70} height={20} />
              ))}
          </div>
        </ShopTagBox>
        <ShopName>{shopInfo?.place_name}</ShopName>
        <ShopRate>
          <div className="flex items-center">
            {shopInfo && <StarRate rate={shopInfo.star_rating_avg} />}
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
          <ShopEvent>
            <a className="flex" href={shopInfo?.place_url} target="_blank">
              <Image src={'/svg/map.svg'} width={18} height={18} alt="지도" />
              <div className="pl-[2px]">카카오맵 보기</div>
            </a>
          </ShopEvent>
          <ShopEvent
            onClick={() => {
              if (shopInfo) {
                handleShareButton(
                  shopInfo?.place_name,
                  shopInfo?.favorite_cnt,
                  shopInfo?.review_cnt,
                  shopId,
                );
              }
            }}
          >
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
        <ul>
          {shopInfo?.recent_reviews.length === 0 ? (
            <span>작성된 리뷰가 없습니다.</span>
          ) : reviewLoaded && reviews ? (
            reviews.map(({ review_info, member_info }) => (
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
          ) : (
            shopInfo?.recent_reviews.map(({ review_info, member_info }) => (
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
          )}
        </ul>
        {!reviewLoaded && (shopInfo?.review_cnt as number) > 3 && (
          <LoadReviewBtn
            onClick={async () => {
              const res = await reviewApi.getAllShopReviews(shopId);
              setReviews(res);
              setReviewLoaded(true);
            }}
          >
            <Image src={'/svg/plus.svg'} width={18} height={18} alt="더보기" />
            <span>리뷰 전체 불러오기</span>
          </LoadReviewBtn>
        )}
      </ShopInfoBox>
      <Button
        className="bottom-[72px]"
        handleButton={() => {
          if (!isLogin) setIsModal(() => true);
          else router.push(`/shopDetail/review?shopId=${shopInfo?.id}`);
        }}
      />
    </PageLayout>
  );
};

const Map = tw.div`
h-[270px] w-full pt-[62px]
`;
const ShopInfoBox = tw.div`
flex flex-col px-4 pt-4 pb-2 mb-[122px]
`;
const ShopTagBox = tw.div`
mb-2 flex items-center
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

export default ShopDetail;
