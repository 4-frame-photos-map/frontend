import tw from 'tailwind-styled-components';
import NavBar from '@components/common/NavBar';
import PageLayout from '@components/layout/PageLayout';
import LocationMap from '@components/common/LocationMap';
import TrackerButton from '@components/home/TrackerButton';
import ShopItem from '@components/location/ShopItem';
import Category from '@components/home/Category';
import Modal from '@components/common/Modal';
import { getToken } from '@utils/token';
import { useState, useEffect } from 'react';
import { useGetShopsInRad } from '@hooks/queries/useGetShop';
import { useRecoilState } from 'recoil';
import { curPosState } from '@recoil/positionAtom';
import { boundState } from '@recoil/boundAtom';

const Location = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [brd, setBrd] = useState<string>('');
  const [shopsInfo, setShopsInfo] = useState<ShopProps[]>();
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [curPos, setCurPos] = useRecoilState(curPosState);
  const [bounds, setBounds] = useRecoilState<Bound>(boundState);

  const { data: shopInfo } = useGetShopsInRad(
    curPos.lat,
    curPos.lng,
    curPos.lat,
    curPos.lng,
    brd,
    5000,
  );

  useEffect(() => {
    if (brd) {
      const brdShops = shopInfo?.shops.filter(
        (shop) => shop.brand?.brand_name === brd,
      );
      setShopsInfo(brdShops);
    } else {
      setShopsInfo(shopInfo?.shops);
    }
  }, [shopInfo, brd]);

  useEffect(() => {
    if (getToken().accessToken) {
      setIsLogin(true);
    }
  }, []);

  const handleTracker = () => {
    const { kakao } = window;
    const moveLatLng = new kakao.maps.LatLng(curPos.lat, curPos.lng);
    kakaoMap.setLevel(3);
    kakaoMap.panTo(moveLatLng);
  };
  return (
    <PageLayout className="bg-white">
      {isModal && (
        <Modal
          isModal={isModal}
          isKakao={true}
          title="로그인 상태가 아니에요!"
          message="해당 기능은 카카오톡 로그인을 하셔야 이용가능한 기능이에요. 로그인 하시겠어요?"
          left="아니요"
          leftEvent={() => setIsModal(false)}
        />
      )}
      <NavBar
        leftTitle={shopInfo?.address}
        isRight={true}
        location={curPos}
        setShopsInfo={setShopsInfo}
        kakaoMap={kakaoMap}
      />
      <LocationMap
        shopInfo={shopsInfo}
        kakaoMap={kakaoMap}
        setKakaoMap={setKakaoMap}
        setCurPos={setCurPos}
        setBounds={setBounds}
      />
      <div className="fixed top-[430px] w-full max-w-[375px] pb-[71px]">
        <TrackerButton onClick={handleTracker} />
      </div>
      <ResultContainer>
        <ResultBox>
          <Bar />
          <Category setBrd={setBrd} className="mt-8" />
          {shopsInfo?.length === 0 && (
            <div className="flex h-[250px] items-center justify-center px-4 text-center text-text-alternative">
              반경 5km 이내 포토부스가 <br />
              존재하지 않습니다.
            </div>
          )}
          <ResultItemBox>
            {shopInfo &&
              shopsInfo?.map((shop) => (
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
                />
              ))}
          </ResultItemBox>
        </ResultBox>
      </ResultContainer>
    </PageLayout>
  );
};

const ResultContainer = tw.div`
mt-[500px] mb-10 h-full w-full bg-white relative
`;
const ResultBox = tw.div`
h-full rounded-t-[15px] pt-2 pb-10
`;
const Bar = tw.div`
m-auto flex h-1 w-[60px] justify-center rounded-sm bg-line-normal
`;
const ResultItemBox = tw.div`
grid w-full grid-cols-2 content-center items-center gap-2 pt-4 px-4
`;

export default Location;
