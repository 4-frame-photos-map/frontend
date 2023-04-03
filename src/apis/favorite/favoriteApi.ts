import instance from '@apis/instance';

class FavoriteApi {
  getFavorites = async (sort?: string): Promise<Favorite[]> => {
    const { data } = await instance.get(`/favorites?sort=${sort}`);
    return data.result;
  };

  postFavorites = async (shopId: number): Promise<TResponse> => {
    const { data } = await instance.post(`/favorites/${shopId}`);
    return data;
  };

  delFavorites = async (shopId: number): Promise<TResponse> => {
    const { data } = await instance.delete(`/favorites/${shopId}`);
    return data;
  };
}

const favoriteApi = new FavoriteApi();

export default favoriteApi;
