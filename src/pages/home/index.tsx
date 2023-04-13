import NavBar from '@components/navbar/NavBar';
import PageLayout from '@components/layout/PageLayout';
import Category from '@components/home/Category';
import ResearchButton from '@components/home/ResearchButton';
import TrackerButton from '@components/home/TrackerButton';
import ShopModal from '@components/home/ShopModal';
import { useEffect, useState } from 'react';
import { useGetShopsInRad } from '@hooks/queries/useGetShop';
import useMapScriptLoad from '@hooks/useMapScriptLoad';
import Map from '@components/common/Map';

const Home = () => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [brd, setBrd] = useState<string>('');
  const [modalProps, setModalProps] = useState<Shop>();
  const [shopsInfo, setShopsInfo] = useState<Shop[]>();
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [mapPos, setMapPos] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const { data: shopInfo } = useGetShopsInRad(location.lat, location.lng, brd);

  useMapScriptLoad(setMapLoaded);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    setShopsInfo(shopInfo);
  }, [shopInfo]);

  const handleTracker = () => {
    const { kakao } = window;
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setLocation({ lat: latitude, lng: longitude });
      const moveLatLng = new kakao.maps.LatLng(latitude, longitude);
      kakaoMap.setLevel(3);
      kakaoMap.panTo(moveLatLng);
    });
    setModalProps(undefined);
    setMapPos({ lat: location.lat, lng: location.lng });
  };

  const handleResearch = () => {
    const { Ma, La } = kakaoMap.getCenter();
    setLocation({ lat: Ma, lng: La });
  };

  return (
    <PageLayout>
      <NavBar area="지도 지역명" isRight={true} />
      <div className="relative z-10">
        <Category setBrd={setBrd} />
        {location.lat !== mapPos.lat && mapPos.lat !== 0 && (
          <ResearchButton onClick={handleResearch} />
        )}
      </div>
      <Map
        position={location}
        isLoaded={mapLoaded}
        shopInfo={shopsInfo}
        kakaoMap={kakaoMap}
        setKakaoMap={setKakaoMap}
        setModalProps={setModalProps}
        setMapPos={setMapPos}
      />
      <div className="absolute bottom-0 w-full pb-[71px]">
        <TrackerButton onClick={handleTracker} />
        {modalProps && (
          <ShopModal
            id={modalProps.id}
            place_name={modalProps.place_name}
            distance={modalProps.distance}
            star_rating_avg={modalProps.star_rating_avg}
            review_cnt={modalProps.review_cnt}
            favorite={modalProps.favorite}
            favorite_cnt={modalProps.favorite_cnt}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Home;
