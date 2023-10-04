import tw from 'tailwind-styled-components';
import type { SettingListsProps } from '.';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SettingList from '@components/my/SettingList';
import PageLayout from '@components/layout/PageLayout';
import Header from '@components/common/Header';
import Modal from '@components/common/Modal';
import authApi from '@apis/auth/authApi';
import memberApi from '@apis/member/memberApi';
import Seo from '@components/common/Seo';

const SettingLists: SettingListsProps[] = [
  { id: 1, text: '닉네임 변경', path: '/my/edit' },
];

const Setting = () => {
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [isWithdrawModal, setIsWithdrawModal] = useState<boolean>(false);
  const router = useRouter();
  const handleLogout = async () => {
    await authApi.logout();
    router.push('/auth/login');
  };

  const handleWithdraw = async () => {
    await memberApi.delAccount();
    router.push('/auth/login');
  };
  return (
    <PageLayout>
      <Seo title="설정" url="my/setting" />
      <Modal
        isModal={isLogoutModal}
        title="로그아웃"
        message="카카오 계정을 로그아웃 하시겠어요?"
        left="취소"
        right="확인"
        leftEvent={() => setIsLogoutModal(false)}
        rightEvent={handleLogout}
      />
      <Modal
        isModal={isWithdrawModal}
        title="회원탈퇴"
        message={
          '회원탈퇴 이후에 저장한 포토부스와 작성한 리뷰를\n더이상 볼 수 없어요.\n정말 탈퇴하시겠어요?'
        }
        left="취소"
        right="확인"
        leftEvent={() => setIsWithdrawModal(false)}
        rightEvent={handleWithdraw}
      />
      <Header centerTitle="설정" isLeft={true} />
      <ListsContainer>
        {SettingLists.map(({ id, text, path }) => (
          <SettingList key={id} text={text} path={path} />
        ))}
      </ListsContainer>
      <ItemsContainer>
        <div className="flex justify-between py-[8px]">
          <span>계정</span>
        </div>
        <div
          onClick={() => setIsLogoutModal(true)}
          className="flex justify-between py-[8px] text-[#67C8FF]"
        >
          <span>카카오 계정 로그아웃</span>
        </div>
        <div
          onClick={() => setIsWithdrawModal(true)}
          className="flex justify-between py-[8px] text-[#67C8FF]"
        >
          <span>회원탈퇴</span>
        </div>
      </ItemsContainer>
    </PageLayout>
  );
};

const ListsContainer = tw.div`
flex cursor-pointer flex-col bg-white px-[16px] text-body2 font-normal mt-[62px]
`;

const ItemsContainer = tw.div`
mt-1 flex cursor-pointer flex-col bg-white px-[16px] text-label2 font-normal
`;

export default Setting;
