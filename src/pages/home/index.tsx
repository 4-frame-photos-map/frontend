import { useEffect, useState } from 'react';
import { useGetShopsInRad } from '@hooks/queries/useGetShop';
import { getToken } from '@utils/token';
import NavBar from '@components/common/NavBar';
import PageLayout from '@components/layout/PageLayout';
import Category from '@components/home/Category';
import ResearchButton from '@components/home/ResearchButton';
import TrackerButton from '@components/home/TrackerButton';
import ShopModal from '@components/home/ShopModal';
import Map from '@components/common/Map';
import Modal from '@components/common/Modal';

const Home = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [brd, setBrd] = useState<string>('');
  const [modalProps, setModalProps] = useState<Shop>();
  const [shopsInfo, setShopsInfo] = useState<Shop[]>();
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [curPos, setCurPos] = useState<Position>({
    lat: 0,
    lng: 0,
  });
  const [location, setLocation] = useState<Position>({
    lat: 0,
    lng: 0,
  });
  const [mapPos, setMapPos] = useState<Position>({
    lat: 0,
    lng: 0,
  });

  const { data: shopInfo } = useGetShopsInRad(location.lat, location.lng, brd);

  useEffect(() => {
    if (getToken().accessToken) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    setShopsInfo(shopInfo);
  }, [shopInfo]);

  const handleTracker = () => {
    const { kakao } = window;
    const moveLatLng = new kakao.maps.LatLng(curPos.lat, curPos.lng);
    kakaoMap.setLevel(3);
    kakaoMap.panTo(moveLatLng);
    setModalProps(undefined);
    setMapPos({ lat: location.lat, lng: location.lng });
    setLocation({ lat: curPos.lat, lng: curPos.lng });
  };

  const handleResearch = () => {
    const { Ma, La } = kakaoMap.getCenter();
    setLocation({ lat: Ma, lng: La });
  };

  return (
    <PageLayout>
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
        area="지도 지역명"
        isRight={true}
        location={curPos}
        setShopsInfo={setShopsInfo}
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
      />
      <div className="fixed bottom-0 w-full max-w-[375px] pb-[71px]">
        <TrackerButton onClick={handleTracker} />
        {modalProps && (
          <ShopModal
            id={modalProps.id}
            place_name={modalProps.place_name}
            distance={modalProps.distance}
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
