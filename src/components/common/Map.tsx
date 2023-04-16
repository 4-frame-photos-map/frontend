import { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react';
import { getSelectedImg, getDefaultImg } from '@utils/getImgSrc';
type MapProps = {
  shopInfo: Shop[] | undefined;
  isLoaded: boolean;
  position: { lat: number; lng: number };
  kakaoMap: any;
  setKakaoMap: Dispatch<SetStateAction<any>>;
  setModalProps: Dispatch<SetStateAction<Shop | undefined>>;
  setMapPos: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
};

const Map = ({
  position,
  isLoaded,
  shopInfo,
  kakaoMap,
  setKakaoMap,
  setModalProps,
  setMapPos,
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    if (isLoaded) {
      if (position?.lat === 0) return;
      const { kakao } = window;
      window.kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(position?.lat, position?.lng),
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer.current, options);
        setKakaoMap(map);
        const imageSrc = '/svg/home/tracking.svg';
        const imageSize = new kakao.maps.Size(32, 32);
        const imageOption = { offset: new kakao.maps.Point(20, 20) };
        const markerPosition = new kakao.maps.LatLng(
          position?.lat,
          position?.lng,
        );
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
      let selectedMarker = null as any;
      setMarkers(() => {
        return shopInfo.map((shop) => {
          const position = new kakao.maps.LatLng(
            Number(shop.latitude),
            Number(shop.longitude),
          );
          const normalImageSrc = getDefaultImg(shop.place_name);
          const clickImageSrc = getSelectedImg(shop.place_name);
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
          new kakao.maps.event.addListener(marker, 'click', () => {
            setModalProps(shop);
            if (!!selectedMarker || selectedMarker !== marker) {
              if (selectedMarker) {
                const normalImage = new kakao.maps.MarkerImage(
                  selectedMarker.T.Yj.replace('_select', ''),
                  imageSize,
                  imageOption,
                );
                selectedMarker && selectedMarker.setImage(normalImage);
              }
              marker.setImage(clickImage);
            }
            selectedMarker = marker;
          });
          return marker;
        });
      });
    }
  }, [shopInfo, kakaoMap]);

  return (
    <>
      <div
        className="absolute top-0 z-0 mt-16 h-[calc(100vh-7rem)] w-full"
        ref={mapContainer}
      ></div>
    </>
  );
};

export default Map;
