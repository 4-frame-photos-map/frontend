import tw from 'tailwind-styled-components';
import BrandTag from '@components/common/BrandTag';
import Modal from '@components/common/Modal';
import Image from 'next/image';
import Link from 'next/link';
import { useDeleteFavorite } from '@hooks/mutations/useDeleteFavorite';
import { usePostFavorite } from '@hooks/mutations/usePostFavorite';
import { useState } from 'react';
import useToast from '@hooks/useToast';

type WishItemProps = Pick<
  Favorite['shop'],
  | 'id'
  | 'place_name'
  | 'distance'
  | 'star_rating_avg'
  | 'review_cnt'
  | 'favorite_cnt'
>;

const WishItem = ({
  id,
  place_name,
  distance,
  review_cnt,
  favorite_cnt,
  star_rating_avg,
}: WishItemProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { showToast } = useToast();
  const { mutate: del } = useDeleteFavorite('/wish');
  const { mutate: add } = usePostFavorite();

  const handleAddFavorite = (shopId: number) => {
    add(shopId);
  };

  const handleDeleteFavorite = (shopId: number) => {
    del(shopId);
    setIsModal(false);
    showToast({
      message: '저장페이지에서 지점이 삭제되었습니다.',
      duration: 1000,
    });
  };

  return (
    <>
      <li className="w-full px-6 py-5 bg-white">
        <BrandTag name={place_name} />
        <div className="flex justify-between pt-1 pb-2">
          <span className="cursor-pointer text-body1">
            <Link href={`/shopDetail/?shopId=${id}`}>{place_name}</Link>
          </span>
          {id ? (
            <Image
              src="/svg/wish/filled-bookmark.svg"
              width={24}
              height={24}
              alt="wish"
              className="cursor-pointer"
              onClick={() => {
                setIsModal(true);
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
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Image src="/svg/star.svg" width={14} height={14} alt="star" />
            <span className="text-caption1">
              {star_rating_avg.toFixed(1)} ({review_cnt}) | 찜{' '}
            </span>
            <span className="font-semibold text-caption1">{favorite_cnt}</span>
          </div>
          <span className="text-caption1">{distance}</span>
        </div>
      </li>
      {isModal && (
        <ModalLayout>
          <Modal
            isModal={isModal}
            isKakao={false}
            title="저장 취소"
            message="해당 지점이 삭제돼요. 저장 페이지에서 삭제 진행하시겠어요?"
            left="저장 유지"
            right="저장 취소"
            leftEvent={() => {
              setIsModal(false);
            }}
            rightEvent={() => {
              handleDeleteFavorite(id);
            }}
          />
        </ModalLayout>
      )}
    </>
  );
};

const ModalLayout = tw.div`
absolute top-0 left-0 w-full h-full
`;

export default WishItem;
