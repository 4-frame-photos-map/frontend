import NavBar from '@components/common/NavBar';
import PageLayout from '@components/layout/PageLayout';
import Category from '@components/home/Category';
import ResearchButton from '@components/home/ResearchButton';
import TrackerButton from '@components/home/TrackerButton';
import ShopModal from '@components/home/ShopModal';
import Map from '@components/common/Map';
import { useEffect, useState } from 'react';
import { useGetShopsInRad } from '@hooks/queries/useGetShop';
import { getToken } from '@utils/token';
import { useRecoilState, RecoilEnv, useSetRecoilState } from 'recoil';
import { curPosState } from '@recoil/positionAtom';
import { boundState } from '@recoil/boundAtom';
import { userState } from '@recoil/userAtom';
import { modalState } from '@recoil/modalAtom';
import MetaHead from '@components/common/MetaHead';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const Home = () => {
  const setIsModal = useSetRecoilState<boolean>(modalState);
  const [isLogin, setIsLogin] = useRecoilState<boolean>(userState);
  const [brd, setBrd] = useState<string>('');
  const [modalProps, setModalProps] = useState<ShopProps>();
  const [shopsInfo, setShopsInfo] = useState<ShopProps[]>();
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [curPos, setCurPos] = useRecoilState(curPosState);
  const [bounds, setBounds] = useRecoilState<Bound>(boundState);
  const [location, setLocation] = useState<Position>({
    lat: 0,
    lng: 0,
  });
  const [mapPos, setMapPos] = useState<Position>({
    lat: 0,
    lng: 0,
  });

  const { data: shopInfo } = useGetShopsInRad(
    curPos.lat,
    curPos.lng,
    location.lat,
    location.lng,
    brd,
    2000,
  );

  useEffect(() => {
    if (getToken().accessToken) setIsLogin(true);
    else setIsLogin(false);
  }, []);

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

  const handleTracker = () => {
    const { kakao } = window;
    const moveLatLng = new kakao.maps.LatLng(curPos.lat, curPos.lng);
    kakaoMap.setLevel(5);
    kakaoMap.panTo(moveLatLng);
    setModalProps(undefined);
    setMapPos({ lat: location.lat, lng: location.lng });
    setLocation({ ...location, lat: curPos.lat, lng: curPos.lng });
  };

  const handleResearch = () => {
    const { Ma, La } = kakaoMap.getCenter();
    setLocation({ ...location, lat: Ma, lng: La });
  };

  return (
    <PageLayout>
      <MetaHead
        title={'홈 | 네컷 지도'}
        description={
          '네컷 포토부스를 찾아보세요. 카테고리의 인생네컷, 하루필름, 포토이즘, 포토그레이를 선택하면 원하는 브랜드만 모아보실 수 있습니다.'
        }
      />
      <NavBar
        leftTitle={shopInfo?.address}
        isRight={true}
        location={curPos}
        setShopsInfo={setShopsInfo}
        kakaoMap={kakaoMap}
      />
      <div className="fixed z-10">
        <Category setBrd={setBrd} />
        {location.lat !== mapPos.lat &&
          location.lng !== mapPos.lng &&
          mapPos.lat !== 0 && <ResearchButton onClick={handleResearch} />}
      </div>
      <Map
        shopInfo={shopsInfo}
        kakaoMap={kakaoMap}
        setLocation={setLocation}
        setKakaoMap={setKakaoMap}
        setModalProps={setModalProps}
        setMapPos={setMapPos}
        setCurPos={setCurPos}
        setBounds={setBounds}
      />
      <div className="fixed bottom-0 w-full max-w-[375px] pb-[71px]">
        <TrackerButton onClick={handleTracker} />
        {modalProps && (
          <ShopModal
            id={modalProps.id}
            place_name={modalProps.place_name}
            star_rating_avg={modalProps.star_rating_avg}
            review_cnt={modalProps.review_cnt}
            isLogin={isLogin}
            setIsModal={setIsModal}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Home;
