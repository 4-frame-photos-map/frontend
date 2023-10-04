import tw from 'tailwind-styled-components';
import Header from '@components/common/Header';
import PageLayout from '@components/layout/PageLayout';
import Map from '@components/common/Map';
import TrackerButton from '@components/home/TrackerButton';
import ShopItem from '@components/location/ShopItem';
import Category from '@components/home/Category';
import RadiusModal from '@components/location/RadiusModal';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useGetShopsInRad } from '@hooks/queries/useGetShop';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { curPosState } from '@recoil/positionAtom';
import { boundState } from '@recoil/boundAtom';
import { userState } from '@recoil/userAtom';
import { modalState } from '@recoil/modalAtom';
import Seo from '@components/common/Seo';

const Location = () => {
  const isLogin = useRecoilValue<boolean>(userState);
  const setIsModal = useSetRecoilState<boolean>(modalState);

  const [isRadModal, setIsRadModal] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(4000);
  const [brd, setBrd] = useState<string>('');
  const [curShopsInfo, setCurShopsInfo] = useState<ShopProps[]>();
  const [shopsInfo, setShopsInfo] = useState<ShopProps[]>();
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [curPos, setCurPos] = useRecoilState(curPosState);
  const [bounds, setBounds] = useRecoilState<Bound>(boundState);

  const { data: shopInfo } = useGetShopsInRad(
    curPos.lat,
    curPos.lng,
    curPos.lat,
    curPos.lng,
    radius,
  );
  useEffect(() => {
    setShopsInfo(shopInfo?.shops);
    setCurShopsInfo(shopInfo?.shops);
  }, [shopInfo]);

  useEffect(() => {
    if (brd) {
      const brdShops = curShopsInfo?.filter(
        (shop) => shop.brand?.brand_name === brd,
      );
      setShopsInfo(brdShops);
    } else {
      setShopsInfo(curShopsInfo);
    }
  }, [curShopsInfo, brd]);

  const handleTracker = () => {
    const { kakao } = window;
    const moveLatLng = new kakao.maps.LatLng(curPos.lat, curPos.lng);
    kakaoMap.setLevel(5);
    kakaoMap.panTo(moveLatLng);
    setCurShopsInfo(shopInfo?.shops);
  };
  return (
    <PageLayout className="bg-white">
      <Seo title="내 주변" url="location" />
      {isRadModal && (
        <RadiusModal
          setIsModal={setIsRadModal}
          setRadius={setRadius}
          radius={radius}
        />
      )}
      <Header
        leftTitle={shopInfo?.address}
        isRight={true}
        location={curPos}
        setShopsInfo={setShopsInfo}
        setCurShopsInfo={setCurShopsInfo}
        kakaoMap={kakaoMap}
      />
      <Map
        isHome={false}
        shopInfo={shopsInfo}
        kakaoMap={kakaoMap}
        setKakaoMap={setKakaoMap}
        setCurPos={setCurPos}
        setBounds={setBounds}
      />
      <div className="fixed top-[385px] w-full max-w-[375px]">
        <TrackerButton onClick={handleTracker} />
      </div>
      <ResultContainer>
        <ResultBox>
          <Bar />
          <RadSelectBox>
            <p>{`내 주변 ${
              Number.isInteger(radius / 1000)
                ? `${radius / 1000}km`
                : `${radius}m`
            }`}</p>
            <Image
              src={'/svg/dropup.svg'}
              alt="열기"
              width={20}
              height={20}
              onClick={() => {
                setIsRadModal(true);
              }}
              className="cursor-pointer"
            />
          </RadSelectBox>
          <div className="my-4 px-4">
            <div className="h-[1px] w-full bg-line-normal"></div>
          </div>
          <Category setBrd={setBrd} className="mt-0" />
          {shopsInfo?.length === 0 ? (
            <NoResultItemBox>
              {`반경 ${
                Number.isInteger(radius / 1000)
                  ? `${radius / 1000}km`
                  : `${radius}m`
              } 이내 포토부스가\n존재하지 않습니다.`}
            </NoResultItemBox>
          ) : (
            <ResultItemBox>
              {shopsInfo?.map((shop) => (
                <ShopItem
                  key={shop.id}
                  brand_name={shop.brand?.brand_name as string}
                  file_path={shop.brand?.file_path as string}
                  position={curPos}
                  id={shop.id}
                  place_name={shop.place_name}
                  star_rating={shop.star_rating_avg}
                  review_cnt={shop.review_cnt}
                  isLogin={isLogin}
                  setIsModal={setIsModal}
                  shop_titles={shop.shop_titles}
                />
              ))}
            </ResultItemBox>
          )}
        </ResultBox>
      </ResultContainer>
    </PageLayout>
  );
};

const ResultContainer = tw.div`
mt-[440px] mb-10 h-full w-full bg-white relative items-start
`;
const ResultBox = tw.div`
h-full rounded-t-[15px] pt-2 pb-10
`;
const Bar = tw.div`
m-auto flex h-1 w-[60px] justify-center rounded-sm bg-line-normal
`;
const RadSelectBox = tw.div`
mt-4 flex gap-2 px-4 text-body1 font-semibold
`;
const ResultItemBox = tw.ul`
grid w-full grid-cols-2 content-center items-center gap-2 pt-4 px-4
`;
const NoResultItemBox = tw.div`
flex h-full justify-center px-4 text-center text-text-alternative my-[52px] whitespace-pre-line
`;

export default Location;
