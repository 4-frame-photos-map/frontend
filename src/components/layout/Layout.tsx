import React from 'react';
import tw from 'tailwind-styled-components';
import Modal from '@components/common/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '@recoil/modalAtom';
import ToastList from '@components/common/ToastList';

type Props = {
  children: React.ReactNode;
};

const LayoutBox = tw.div`
flex justify-center w-screen h-full font-Pretendard overflow-x-hidden overflow-y-hidden
`;

const Layout = ({ children }: Props) => {
  const [isModal, setIsModal] = useRecoilState(modalState);
  return (
    <LayoutBox>
      {isModal && (
        <Modal
          isModal={true}
          isKakao={true}
          title="로그인 상태가 아니에요!"
          message="해당 페이지는 카카오톡 로그인을 하셔야 이용가능한 페이지에요. 로그인 하시겠어요?"
          left="아니요"
          leftEvent={() => setIsModal(false)}
        />
      )}
      {children}
      <ToastList />
    </LayoutBox>
  );
};

export default Layout;
