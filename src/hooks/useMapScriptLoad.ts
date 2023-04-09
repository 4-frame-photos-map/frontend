import { Dispatch, SetStateAction, useEffect } from 'react';
import { CONFIG } from '@config';

export default function useMapScriptLoad(
  setMapLoaded: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${CONFIG.API_KEYS.MAP}&autoload=false&libraries=services`;
    $script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild($script);
  }, [setMapLoaded]);
}
