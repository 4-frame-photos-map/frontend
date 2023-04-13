import SettingList from '@components/my/SettingList';
import type { SettingListsProps } from '.';
import tw from 'tailwind-styled-components';
import PageLayout from '@components/layout/PageLayout';
import NavBar from '@components/navbar/NavBar';

const ListsContainer = tw.div`
flex cursor-pointer flex-col bg-white px-[16px] text-body2 font-normal mt-[62px]
`;

const ItemsContainer = tw.div`
mt-1 flex cursor-pointer flex-col bg-white px-[16px] text-label2 font-normal
`;

const SettingLists: SettingListsProps[] = [
  { id: 1, text: '닉네임 변경', path: '/my/edit' },
  { id: 2, text: '이용약관 확인', path: '/terms' },
  { id: 3, text: '개인정보 처리방침 확인', path: '/' },
];

const Setting = () => {
  return (
    <PageLayout>
      <NavBar title="설정" isLeft={true} />
      <ListsContainer>
        {SettingLists.map(({ id, text, path }) => (
          <SettingList key={id} text={text} path={path} />
        ))}
      </ListsContainer>
      <ItemsContainer>
        <div className="flex justify-between py-[8px]">
          <span>계정</span>
        </div>
        <div className="flex justify-between py-[8px] text-[#67C8FF]">
          <span>카카오 계정 로그아웃</span>
        </div>
        <div className="flex justify-between py-[8px] text-[#67C8FF]">
          <span>회원탈퇴</span>
        </div>
      </ItemsContainer>
    </PageLayout>
  );
};

export default Setting;
