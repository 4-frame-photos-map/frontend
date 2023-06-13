import instance from '@apis/instance';

class FavoriteApi {
  getAllFavorites = async (lat: number, lng: number): Promise<Favorite[]> => {
    const { data } = await instance.get(
      `/favorites?userLat=${lat}&userLng=${lng}`,
    );
    return data;
  };

  postFavorites = async (shopId: number): Promise<void> => {
    return await instance.post(`/favorites/${shopId}`);
  };

  delFavorites = async (shopId: number): Promise<void> => {
    return await instance.delete(`/favorites/${shopId}`);
  };
}

const favoriteApi = new FavoriteApi();

export default favoriteApi;
