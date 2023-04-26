import instance from '@apis/instance';

class ReviewApi {
  getReview = async (reviewId: number): Promise<Review> => {
    const { data } = await instance.get(`/reviews/${reviewId}`);
    return data;
  };

  getAllShopReviews = async (shopId: number): Promise<Review[]> => {
    const { data } = await instance.get(`/reviews/shop/${shopId}`);
    return data;
  };

  getAllUserReviews = async (): Promise<Review[]> => {
    const { data } = await instance.get(`/reviews/member`);
    return data;
  };

  postReview = async (shopId: number, info: ReviewInfoProps): Promise<void> => {
    return await instance.post(`/reviews/shop/${shopId}`, info);
  };

  patchReview = async (
    reviewId: number,
    info: ReviewInfoProps,
  ): Promise<void> => {
    return await instance.patch(`/reviews/${reviewId}`, info);
  };

  deleteReview = async (reviewId: number): Promise<void> => {
    return await instance.delete(`/reviews/${reviewId}`);
  };
}

const reviewApi = new ReviewApi();

export default reviewApi;
