import instance from '@apis/instance';

class FavoriteApi {
  getAllFavorites = async (
    lng: number,
    lat: number,
    sort?: string,
  ): Promise<Favorite[]> => {
    const { data } = await instance.get(
      `/favorites?longitude=${lng}&latitude=${lat}&sort=${sort}`,
    );
    return data.result;
  };

  postFavorites = async (shopId: number): Promise<void> => {
    const { data } = await instance.post(`/favorites/${shopId}`);
    return data;
  };

  delFavorites = async (shopId: number): Promise<void> => {
    const { data } = await instance.delete(`/favorites/${shopId}`);
    return data;
  };
}

const favoriteApi = new FavoriteApi();

export default favoriteApi;
