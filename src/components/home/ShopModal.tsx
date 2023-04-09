import BrandTag from '@components/common/BrandTag';
import { useDeleteFavorite } from '@hooks/mutations/useDeleteFavorite';
import { usePostFavorites } from '@hooks/mutations/usePostFavorite';
import Image from 'next/image';
import { ModalProps } from 'pages/home';

const ShopModal = ({
  id,
  place_name,
  distance,
  star_rating_avg,
  review_cnt,
  favorite,
  favorite_cnt,
}: ModalProps) => {
  const { mutate: add } = usePostFavorites();
  const { mutate: del } = useDeleteFavorite();

  const handleAddFavorite = (id: number) => {
    add(id);
  };
  const handleDeleteFavorite = (id: number) => {
    del(id);
  };

  return (
    <div className="mx-6 h-[98px] rounded-[8px] bg-bg-secondary shadow-shopModal">
      <div className="p-4">
        <BrandTag name={place_name} />
        <div className="flex justify-between pt-1 pb-2">
          <span className="text-label1">{place_name}</span>
          {favorite ? (
            <Image
              src="/svg/wish/filled-bookmark.svg"
              width={24}
              height={24}
              alt="wish"
              onClick={() => handleDeleteFavorite(id)}
            />
          ) : (
            <Image
              src="/svg/wish/lined-bookmark.svg"
              width={24}
              height={24}
              alt="wish"
              className="cursor-pointer"
              onClick={() => handleAddFavorite(id)}
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image src="/svg/star.svg" width={16} height={16} alt="star" />
            <span className="text-caption1">
              {star_rating_avg}({review_cnt})
            </span>
          </div>
          <span className="text-caption1">{distance}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
