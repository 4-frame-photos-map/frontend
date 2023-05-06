import tw from 'tailwind-styled-components';
import Image from 'next/image';
import Modal from '@components/common/Modal';
import ToastMessage from '@components/common/ToastMessage';
import { useState } from 'react';
import { useDeleteFavorite } from '@hooks/mutations/useDeleteFavorite';
import { usePostFavorite } from '@hooks/mutations/usePostFavorite';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@recoil/userAtom';
import { modalState } from '@recoil/modalAtom';

type FavortieButtonProps = {
  shopId: number;
  isFavorite?: boolean;
};

const FavoriteButton = ({ shopId, isFavorite }: FavortieButtonProps) => {
  const { mutate: del, isSuccess, isError } = useDeleteFavorite('/shopDetail');
  const { mutate: add } = usePostFavorite();

  const setIsLoginModal = useSetRecoilState(modalState);
  const isLogin = useRecoilValue(userState);
  const [isModal, setIsModal] = useState<boolean>(false);
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

  return (
    <>
      {isFavorite ? (
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
      ) : (
        <Image
          src="/svg/wish/lined-bookmark.svg"
          width={24}
          height={24}
          alt="bookmark"
          className="z-[900] cursor-pointer"
          onClick={() => {
            if (!isLogin) setIsLoginModal(true);
            else handleAddFavorite(shopId);
          }}
        />
      )}

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
