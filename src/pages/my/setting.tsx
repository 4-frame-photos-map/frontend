import tw from 'tailwind-styled-components';
import type { SettingListsProps } from '.';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SettingList from '@components/my/SettingList';
import PageLayout from '@components/layout/PageLayout';
import NavBar from '@components/common/NavBar';
import Modal from '@components/common/Modal';
import authApi from '@apis/auth/authApi';
import memberApi from '@apis/member/memberApi';
import MetaHead from '@components/common/MetaHead';

const SettingLists: SettingListsProps[] = [
  { id: 1, text: '닉네임 변경', path: '/my/edit' },
  { id: 2, text: '이용약관 확인', path: '/terms' },
  { id: 3, text: '개인정보 처리방침 확인', path: '/' },
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
      <MetaHead
        title={'설정 | 네컷 지도'}
        description={`네컷지도 설정 페이지입니다.`}
      />
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
          '회원탈퇴 이후에 저장한 포토부스와 작성한 후기를\n더이상 볼 수 없어요.\n정말 탈퇴하시겠어요?'
        }
        left="취소"
        right="확인"
        leftEvent={() => setIsWithdrawModal(false)}
        rightEvent={handleWithdraw}
      />
      <NavBar centerTitle="설정" isLeft={true} />
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
