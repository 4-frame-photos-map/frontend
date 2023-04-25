import instance from '@apis/instance';

class ShopApi {
  getShopsByKeyword = async (
    keyword: string,
    lat: number,
    lng: number,
  ): Promise<Shop[]> => {
    const { data } = await instance.get(
      `/shops?keyword=${keyword}&userLat=${lat}&userLng=${lng}`,
    );
    return data;
  };

  getShopsInRad = async (
    lat: number,
    lng: number,
    mapLat: number,
    mapLng: number,
    brd?: string,
  ): Promise<ShopInRad> => {
    const { data } = await instance.get(
      `/shops/brand?userLat=${lat}&userLng=${lng}&mapLat=${mapLat}&mapLng=${mapLng}&brand=${brd}`,
    );
    return data;
  };

  getShopDetail = async (
    shopId: number,
    distance: string,
  ): Promise<ShopDetail> => {
    const { data } = await instance.get(
      `/shops/${shopId}?distance=${distance}`,
    );
    return data;
  };

  getShopModal = async (
    shopId: number,
    place_name: string,
    place_url: string,
    distance: string,
  ): Promise<ShopProps> => {
    const { data } = await instance.get(
      `/shops/${shopId}/info?placeName=${place_name}&placeUrl=${place_url}&distance=${distance}`,
    );
    return data;
  };
}

const shopApi = new ShopApi();

export default shopApi;
