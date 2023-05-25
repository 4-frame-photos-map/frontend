import { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react';
import { CONFIG } from '@config';
import { SetterOrUpdater } from 'recoil';

type MapProps = {
  isHome?: boolean;
  shopInfo: ShopProps[] | undefined;
  kakaoMap: any;
  setKakaoMap: Dispatch<SetStateAction<any>>;
  setCurPos: SetterOrUpdater<Position>;
  setBounds: SetterOrUpdater<any>;
  setModalProps?: Dispatch<SetStateAction<ShopProps | null>>;
  setLocation?: Dispatch<SetStateAction<Position>>;
  setMapPos?: Dispatch<SetStateAction<Position>>;
};

const Map = ({
  isHome = true,
  shopInfo,
  kakaoMap,
  setKakaoMap,
  setCurPos,
  setBounds,
  setModalProps,
  setLocation,
  setMapPos,
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
          level: 5,
        };
        const map = new kakao.maps.Map(mapContainer.current, mapOption);
        setKakaoMap(map);
        const imageSrc = '/svg/home/tracking.svg';
        const imageSize = new kakao.maps.Size(25, 25);
        const imageOption = { offset: new kakao.maps.Point(20, 20) };
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
              const { latitude, longitude } = coords;
              if (setLocation) {
                setLocation({ lat: latitude, lng: longitude });
              }
              setCurPos((location) => {
                return { ...location, lat: latitude, lng: longitude };
              });
              const locPosition = new kakao.maps.LatLng(latitude, longitude);
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
            },
            (err) => {
              if (err.code === 1) alert('위치 정보를 허용해주세요.');
              if (err.code === 3)
                alert('위치 정보를 가져오는데 시간이 초과되었습니다.');
            },
            {
              timeout: 5000,
            },
          );
        }
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (shopInfo && kakaoMap) {
      const { kakao } = window;
      if (setMapPos) {
        kakao.maps.event.addListener(kakaoMap, 'dragend', () => {
          const { Ma, La } = kakaoMap.getCenter();
          setMapPos({ lat: Ma, lng: La });
        });
      }
      if (markers.length) {
        markers.forEach((marker) => marker.setMap(null));
      }
      const imageSize = new kakao.maps.Size(35, 35);
      const imageOption = {
        offset: new kakao.maps.Point(20, 30),
      };
      const bounds = new kakao.maps.LatLngBounds();
      let selectedMarker = null as any;
      setMarkers(() => {
        return shopInfo.map((shop) => {
          const position = new kakao.maps.LatLng(
            Number(shop.latitude),
            Number(shop.longitude),
          );
          const normalImageSrc = '/svg/marker.svg';
          const clickImageSrc = '/svg/marker_select.svg';
          const normalImage = new kakao.maps.MarkerImage(
            normalImageSrc,
            imageSize,
            imageOption,
          );
          const clickImage = new kakao.maps.MarkerImage(
            clickImageSrc,
            imageSize,
            imageOption,
          );
          const marker = new kakao.maps.Marker({
            map: kakaoMap,
            position: position,
            image: normalImage,
            clickable: true,
          });
          bounds.extend(position);
          if (isHome && setModalProps) {
            new kakao.maps.event.addListener(marker, 'click', () => {
              setModalProps(shop);
              kakaoMap.panTo(position);
              if (!!selectedMarker || selectedMarker !== marker) {
                if (selectedMarker) {
                  selectedMarker && selectedMarker.setImage(normalImage);
                  selectedMarker.setZIndex(0);
                }
                marker.setImage(clickImage);
                marker.setZIndex(1);
              }
              selectedMarker = marker;
            });
          }
          return marker;
        });
      });
      setBounds(() => {
        return bounds;
      });
    }
  }, [shopInfo, kakaoMap]);

  return (
    <>
      <div
        className={`${
          isHome ? 'absolute h-full' : 'fixed h-[500px]'
        } top-0 z-0 w-full max-w-[375px]`}
        ref={mapContainer}
      ></div>
    </>
  );
};

export default Map;
