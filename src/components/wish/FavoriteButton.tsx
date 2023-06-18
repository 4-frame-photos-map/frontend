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
import useToast from '@hooks/useToast';

type FavortieButtonProps = {
  shopId: number;
  isFavorite?: boolean;
};

const FavoriteButton = ({ shopId, isFavorite }: FavortieButtonProps) => {
  const { mutate: del } = useDeleteFavorite('/shopDetail');
  const { mutate: add } = usePostFavorite();
  const { showToast } = useToast();

  const setIsLoginModal = useSetRecoilState(modalState);
  const isLogin = useRecoilValue(userState);

  const handleAddFavorite = (shopId: number) => {
    add(shopId);
    showToast({ message: '해당 지점을 찜 목록에 추가했어요.', duration: 1000 });
  };

  const handleDeleteFavorite = (shopId: number) => {
    del(shopId);
    showToast({
      message: '해당 지점을 찜 목록에서 삭제했어요.',
      duration: 1000,
    });
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
    </>
  );
};

export default FavoriteButton;
