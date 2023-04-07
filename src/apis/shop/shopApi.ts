import instance from '@apis/instance';

class ShopApi {
  getShopsByKeyword = async (
    keyword: string,
    lat: number,
    lng: number,
  ): Promise<Shop[]> => {
    const { data } = await instance.get(
      `/shops?keyword=${keyword}&latitude=${lat}&longitude=${lng}`,
    );
    return data;
  };

  getShopsInRad = async (
    lat: number,
    lng: number,
    brd?: string,
  ): Promise<Shop[]> => {
    const { data } = await instance.get(
      `/shops/brand?latitude=${lat}&longitude=${lng}&brand=${brd}`,
    );
    return data;
  };

  getShopDetail = async (shopId: number, distance): Promise<ShopDetail> => {
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
