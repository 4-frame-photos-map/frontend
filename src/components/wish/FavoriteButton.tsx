import Image from 'next/image';
import { useState } from 'react';
import { queryClient } from 'pages/_app';
import { useDeleteFavorite } from '@hooks/mutations/useDeleteFavorite';
import { usePostFavorites } from '@hooks/mutations/usePostFavorite';
import Modal from '@components/common/Modal';
import ToastMessage from '@components/common/ToastMessage';
import tw from 'tailwind-styled-components';
import { useGetShopDetail } from '@hooks/queries/useGetShop';
import { getToken } from '@utils/token';

type FavortieButtonProps = {
  shopId: number;
  isWish?: boolean;
  distance: string;
};

const FavoriteButton = ({ shopId, isWish, distance }: FavortieButtonProps) => {
  const { data: shopInfo, isFetched } = useGetShopDetail(shopId, distance);
  const { mutate: del, isSuccess, isError } = useDeleteFavorite();
  const { mutate: add } = usePostFavorites();
  const favoritesCache = queryClient.getQueryData<Favorite[]>([
    'useGetFavorites',
  ]);

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);

  const handleAddFavorite = (shopId: number) => {
    add(shopId);
  };

  const handleDeleteFavorite = (shopId: number) => {
    del(shopId);
  };

  const handleToast = async () => {
    await del;
    setToast(true);
  };

  const favCacheArray = favoritesCache?.map((fav) => fav.shop.id);

  return (
    <>
      {isWish &&
        (favCacheArray?.includes(shopId) ? (
          <Image
            src="/svg/wish/filled-bookmark.svg"
            width={24}
            height={24}
            alt="bookmark"
            className="cursor-pointer"
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
            className="cursor-pointer"
            onClick={() => handleAddFavorite(shopId)}
          />
        ))}

      {!isWish &&
        isFetched &&
        (shopInfo?.favorite ? (
          <Image
            src="/svg/wish/filled-bookmark.svg"
            width={24}
            height={24}
            alt="bookmark"
            className="z-[900] cursor-pointer"
            onClick={() => {
              handleDeleteFavorite(shopId);
              handleToast();
            }}
          />
        ) : !getToken().accessToken ? (
          <Image
            src="/svg/wish/lined-bookmark.svg"
            width={24}
            height={24}
            alt="bookmark"
            className="z-[900] cursor-pointer"
            onClick={() => setIsLogin(true)}
          />
        ) : (
          <Image
            src="/svg/wish/lined-bookmark.svg"
            width={24}
            height={24}
            alt="bookmark"
            className="z-[900] cursor-pointer"
            onClick={() => handleAddFavorite(shopId)}
          />
        ))}

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
              handleDeleteFavorite(shopId);
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

export default FavoriteButton;
