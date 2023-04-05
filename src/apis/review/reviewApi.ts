import instance from '@apis/instance';

class ReviewApi {
  getReview = async (reviewId: number): Promise<Review> => {
    const { data } = await instance.get(`/reviews/${reviewId}`);
    return data.result;
  };

  getAllShopReviews = async (shopId: number): Promise<Review[]> => {
    const { data } = await instance.get(`/reviews/shop/${shopId}`);
    return data.result;
  };

  getAllUserReviews = async (): Promise<Review[]> => {
    const { data } = await instance.get(`/reviews/member`);
    return data.result;
  };

  postReview = async (shopId: number, info: ReviewInfo): Promise<TResponse> => {
    const { data } = await instance.post(`/reviews/shop/${shopId}`, info);
    return data;
  };

  patchReview = async (
    reviewId: number,
    info: ReviewInfo,
  ): Promise<TResponse> => {
    const { data } = await instance.patch(`/reviews/${reviewId}`, info);
    return data;
  };

  deleteReview = async (reviewId: number): Promise<TResponse> => {
    const { data } = await instance.delete(`/reviews/${reviewId}`);
    return data;
  };
}

const reviewApi = new ReviewApi();

export default reviewApi;
