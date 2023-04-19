import BrandTag from '@components/common/BrandTag';
import Modal from '@components/common/Modal';
import ToastMessage from '@components/common/ToastMessage';
import { useDeleteFavorite } from '@hooks/mutations/useDeleteFavorite';
import { usePostFavorite } from '@hooks/mutations/usePostFavorite';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

const WishItem = ({ shop }: Favorite) => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);
  const { mutate: del, isSuccess, isError } = useDeleteFavorite();
  const { mutate: add } = usePostFavorite();

  const handleAddFavorite = (shopId: number) => {
    add(shopId);
  };

  const handleDeleteFavorite = (shopId: number) => {
    del(shopId);
  };

  return (
    <>
      <li className="w-full bg-white px-6 py-5">
        <BrandTag name={shop.place_name} />
        <div className="flex justify-between pt-1 pb-2">
          <span
            className="cursor-pointer text-body1"
            onClick={() =>
              router.push(
                `/shopDetail/?shopId=${shop.id}&distance=${shop.distance}`,
              )
            }
          >
            {shop.place_name}
          </span>
          {shop.id ? (
            <Image
              src="/svg/wish/filled-bookmark.svg"
              width={24}
              height={24}
              alt="bookmark"
              className="z-[900] cursor-pointer"
              onClick={() => {
                setIsModal(true);
                setToast(true);
              }}
            />
          ) : (
            <Image
              src="/svg/wish/lined-bookmark.svg"
              width={24}
              height={24}
              alt="bookmark"
              className="z-[900] cursor-pointer"
              onClick={() => handleAddFavorite(shop.id)}
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Image src="/svg/star.svg" width={14} height={14} alt="star" />
            <span className="text-caption1">
              {shop.star_rating_avg.toFixed(1)} ({shop.review_cnt}) | 찜{' '}
            </span>
            <span className="text-caption1 font-semibold">
              {shop.favorite_cnt}
            </span>
          </div>
          <span className="text-caption1">{shop.distance}</span>
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
              handleDeleteFavorite(shop.id);
              setIsModal(false);
            }}
          />
        </ModalLayout>
      )}
      {isLogin && (
        <ModalLayout>
          <Modal
            isModal={true}
            isKakao={true}
            title="로그인 상태가 아니에요!"
            message="해당 기능은 카카오톡 로그인을 하셔야 이용가능한 기능이에요. 로그인 하시겠어요?"
            left="아니요"
            leftEvent={() => setIsLogin(false)}
          />
        </ModalLayout>
      )}
      {toast && isSuccess && (
        <div className="fixed bottom-0 z-[900] pb-[71px]">
          <ToastMessage
            text="저장페이지에서 지점이 삭제되었습니다."
            setToast={setToast}
          />
        </div>
      )}
      {toast && isError && (
        <div className="fixed bottom-0 z-[900] w-full max-w-[375px] pb-[71px]">
          <ToastMessage
            text="오류가 발생했습니다. 다시 시도해주세요."
            setToast={setToast}
          />
        </div>
      )}
    </>
  );
};

const ModalLayout = tw.div`
absolute top-0 left-0 w-full h-full
`;

export default WishItem;
