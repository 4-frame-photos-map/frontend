import Script from 'next/script';
import { CONFIG } from '@config';
import { RefObject } from 'react';
import { getSelectedImg } from '@utils/getImgSrc';

type ScriptsProps = {
  shopInfo: ShopDetail;
  mapContainer: RefObject<HTMLDivElement>;
};

const Scripts = ({ shopInfo, mapContainer }: ScriptsProps) => {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${CONFIG.API_KEYS.MAP}&libraries=services,clusterer&autoload=false`}
        onReady={() => {
          const { kakao } = window;
          kakao.maps.load(() => {
            const options = {
              center: new kakao.maps.LatLng(
                Number(shopInfo?.latitude),
                Number(shopInfo?.longitude),
              ),
              level: 2,
            };
            const map = new kakao.maps.Map(mapContainer.current, options);
            const imageSrc = getSelectedImg(shopInfo?.place_name);
            const imageSize = new kakao.maps.Size(32, 32);
            const imageOption = { offset: new kakao.maps.Point(20, 20) };
            const markerImage = new kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption,
            );
            const markerPosition = new kakao.maps.LatLng(
              Number(shopInfo?.latitude),
              Number(shopInfo?.longitude),
            );
            const marker = new kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
            });
            marker.setMap(map);
          });
        }}
      />
    </>
  );
};

export default Scripts;
