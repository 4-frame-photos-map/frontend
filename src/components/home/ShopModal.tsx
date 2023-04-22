import BrandTag from '@components/common/BrandTag';
import { useDeleteFavorite } from '@hooks/mutations/useDeleteFavorite';
import { usePostFavorite } from '@hooks/mutations/usePostFavorite';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

type ShopModalProps = {
  id: number;
  place_name: string;
  distance: string;
  star_rating_avg: number;
  review_cnt: number;
  favorite: boolean;
  favorite_cnt: number;
  isFavorite?: boolean;
  setIsFavorite: Dispatch<SetStateAction<boolean | undefined>>;
};

const ShopModal = ({
  id,
  place_name,
  distance,
  star_rating_avg,
  review_cnt,
  favorite,
  favorite_cnt,
  isFavorite,
  setIsFavorite,
}: ShopModalProps) => {
  const router = useRouter();
  const { mutate: add } = usePostFavorite();
  const { mutate: del } = useDeleteFavorite();

  const handleAddFavorite = (id: number) => {
    add(id);
    setIsFavorite(true);
  };
  const handleDeleteFavorite = (id: number) => {
    del(id);
    setIsFavorite(false);
  };

  return (
    <div className="mx-6 h-[98px] cursor-pointer rounded-[8px] bg-bg-secondary shadow-shopModal">
      <div className="p-4">
        <BrandTag name={place_name} />
        <div className="flex justify-between pt-1 pb-2">
          <span
            className="text-label1"
            onClick={() =>
              router.push(`/shopDetail?shopId=${id}&distance=${distance}`)
            }
          >
            {place_name}
          </span>
          {isFavorite ? (
            <Image
              src="/svg/wish/filled-bookmark.svg"
              width={24}
              height={24}
              alt="wish"
              onClick={() => {
                handleDeleteFavorite(id);
              }}
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
        <div className="flex justify-between text-caption1">
          <div className="flex items-center">
            <span className="flex pr-2">
              <Image src="/svg/star.svg" width={16} height={16} alt="star" />
              {star_rating_avg}({review_cnt})
            </span>
            <div className="pl-2 border-l">
              <span className="pr-1">찜</span>
              <span className="font-semibold">{favorite_cnt}</span>
            </div>
          </div>
          <span>{distance}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
