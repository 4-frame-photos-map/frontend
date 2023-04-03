import { Dispatch, SetStateAction, useEffect } from 'react';

export default function useMapScriptLoad(
  setMapLoaded: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    $script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild($script);
  }, [setMapLoaded]);
}
