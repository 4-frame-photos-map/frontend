import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';
import Category from '@components/home/Category';
import ResearchButton from '@components/home/ResearchButton';
import TrackerButton from '@components/home/TrackerButton';
import ShopModal from '@components/home/ShopModal';
import { useEffect, useRef, useState } from 'react';
import { useGetShopsInRad } from '@hooks/useGetShop';
import useMapScriptLoad from '@hooks/useMapScriptLoad';

export interface ModalProps {
  id?: number;
  place_name: string;
  distance: string;
  place_url?: string;
  star_rating_avg: number;
  review_cnt: number;
  favorite: boolean;
}

const modalInfo: ModalProps = {
  id: 4860,
  place_name: '인생네컷 서울경리단길점',
  distance: '299m',
  place_url: 'http://place.map.kakao.com/896507036',
  star_rating_avg: 0.0,
  review_cnt: 0,
  favorite: false,
};

const Home = () => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [brd, setBrd] = useState<string>('');

  const { data: shopInfo } = useGetShopsInRad(location.lat, location.lng, brd);

  useMapScriptLoad(setMapLoaded);

  useEffect(() => {
    if (!mapLoaded) return;
    if (mapLoaded) {
      const { kakao } = window;
      kakao.maps.load(() => {
        const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer.current, mapOption);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });

            const lat = position.coords.latitude,
              lon = position.coords.longitude;

            const locPosition = new kakao.maps.LatLng(lat, lon),
              message = '<div style="padding:5px;">현 위치</div>';
            displayMarker(locPosition, message);
          });
        } else {
          const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
            message = 'geolocation을 사용할수 없어요..';

          displayMarker(locPosition, message);
        }
        function displayMarker(locPosition, message) {
          const imageSrc = '/svg/home/tracking.svg';
          const imageSize = new kakao.maps.Size(32, 32);
          const imageOption = { offset: new kakao.maps.Point(20, 20) };
          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          );
          const marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
            image: markerImage,
          });

          const iwContent = message,
            iwRemoveable = true;

          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          infowindow.open(map, marker);

          map.setCenter(locPosition);
        }
      });
    }
  }, [mapLoaded]);

  return (
    <PageLayout>
      <NavBar area="지도 지역명" isRight={true} />
      <div className="relative z-10">
        <Category setBrd={setBrd} />
        <ResearchButton />
      </div>
      <div
        className="absolute top-0 z-0 mt-16 h-[calc(100vh-7rem)] w-full"
        ref={mapContainer}
      ></div>
      <div className="absolute bottom-0 w-full pb-[71px]">
        <TrackerButton />
        <ShopModal
          place_name={modalInfo.place_name}
          distance={modalInfo.distance}
          star_rating_avg={modalInfo.star_rating_avg}
          review_cnt={modalInfo.review_cnt}
          favorite={modalInfo.favorite}
        />
      </div>
    </PageLayout>
  );
};

export default Home;
