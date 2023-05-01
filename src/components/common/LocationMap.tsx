import { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react';
import { CONFIG } from '@config';

type Position = {
  lat: number;
  lng: number;
};

type MapProps = {
  shopInfo: ShopProps[] | undefined;
  kakaoMap: any;
  setKakaoMap: Dispatch<SetStateAction<any>>;
  setLocation: Dispatch<SetStateAction<Position>>;
  setMapPos: Dispatch<SetStateAction<Position>>;
  setCurPos: Dispatch<SetStateAction<Position>>;
};

const LocationMap = ({
  shopInfo,
  kakaoMap,
  setKakaoMap,
  setLocation,
  setMapPos,
  setCurPos,
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${CONFIG.API_KEYS.MAP}&autoload=false&libraries=services`;
    document.head.appendChild($script);
    $script.onload = () => {
      setIsLoaded(true);
    };
    if (isLoaded) {
      const { kakao } = window;
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer.current, mapOption);
        setLocation({ lat: 33.450701, lng: 126.570667 });
        setMapPos({ lat: 33.450701, lng: 126.570667 });
        setCurPos({ lat: 33.450701, lng: 126.570667 });
        setKakaoMap(map);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            setLocation({ lat: latitude, lng: longitude });
            setMapPos({ lat: latitude, lng: longitude });
            setCurPos({ lat: latitude, lng: longitude });
            const locPosition = new kakao.maps.LatLng(latitude, longitude);
            const imageSrc = '/svg/home/tracking.svg';
            const imageSize = new kakao.maps.Size(32, 32);
            const imageOption = { offset: new kakao.maps.Point(20, 20) };
            const markerPosition = new kakao.maps.LatLng(latitude, longitude);
            const markerImage = new kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption,
            );
            const marker = new kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
            });
            marker.setMap(map);
            map.setCenter(locPosition);
          });
        }
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (shopInfo && kakaoMap) {
      const { kakao } = window;
      kakao.maps.event.addListener(kakaoMap, 'dragend', () => {
        const { Ma, La } = kakaoMap.getCenter();
        setMapPos({ lat: Ma, lng: La });
      });
      if (markers.length) {
        markers.forEach((marker) => marker.setMap(null));
      }
      const imageSize = new kakao.maps.Size(35, 35);
      const imageOption = {
        offset: new kakao.maps.Point(20, 30),
      };
      setMarkers(() => {
        return shopInfo.map((shop) => {
          const position = new kakao.maps.LatLng(
            Number(shop.latitude),
            Number(shop.longitude),
          );
          const normalImageSrc = '/svg/marker.svg';
          const normalImage = new kakao.maps.MarkerImage(
            normalImageSrc,
            imageSize,
            imageOption,
          );
          const marker = new kakao.maps.Marker({
            map: kakaoMap,
            position: position,
            image: normalImage,
            clickable: true,
          });
          return marker;
        });
      });
    }
  }, [shopInfo, kakaoMap]);

  return (
    <>
      <div
        className="absolute top-0 z-0 h-[500px] w-full max-w-[375px]"
        ref={mapContainer}
      ></div>
    </>
  );
};

export default LocationMap;