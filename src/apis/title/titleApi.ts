import instance from '@apis/instance';

class TitleApi {
  getTitle = async (id: number): Promise<MemberTitle> => {
    const { data } = await instance.get(`/member-titles/${id}`);
    return data.result;
  };

  getAllTitles = async (): Promise<MemberTitle> => {
    const { data } = await instance.get(`/member-titles`);
    return data.result;
  };

  getShopTitles = async (shopId: number): Promise<ShopTitle[]> => {
    const { data } = await instance.get(`/shop-title-logs/${shopId}`);
    return data.result;
  };
}

const titleApi = new TitleApi();

export default titleApi;
