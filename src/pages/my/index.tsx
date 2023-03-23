import NavBar from '@/components/common/NavBar';
import PageLayout from '@/components/common/PageLayout';
import SettingItem from '@/components/my/SettingItem';
import SettingList from '@/components/my/SettingList';
import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

const GreetingBox = tw.div`
flex h-[60px] justify-between px-[16px]
`;

const Greeting = tw.div`
flex items-center text-title1 font-normal
`;

const SettingBox = tw.div`
flex cursor-pointer rounded-xl border bg-bg-tertiary p-1
`;

const ItemsContainer = tw.div`
flex w-full justify-between px-[16px] py-[24px]
`;

const ListsContainer = tw.div`
flex cursor-pointer flex-col px-[16px] text-body2 font-normal
`;

const DivisionBar = tw.div`
h-[4px] w-full bg-bg-primary
`;

export type SettingListsProps = {
  id: number;
  text: string;
  path: string;
};

type SettingItemsProps = SettingListsProps & {
  icon: string;
};

const SettingItems: SettingItemsProps[] = [
  { id: 1, text: '내 후기', icon: '/svg/review.svg', path: '/my/reviews' },
  { id: 2, text: '내 칭호', icon: '/svg/title.svg', path: '/my/titles' },
  { id: 3, text: '공지사항', icon: '/svg/notice.svg', path: '/notice' },
];

const SettingLists: SettingListsProps[] = [
  { id: 1, text: '문의사항', path: '/inquiry' },
  { id: 2, text: '약관 확인', path: '/notice' },
];

const My = () => {
  const router = useRouter();
  return (
    <PageLayout className="bg-white">
      <NavBar title={'마이페이지'} isMy={true} />
      <GreetingBox>
        <Greeting>
          <span className="font-semibold">닉네임</span>님 안녕하세요!
        </Greeting>
        <div className="flex items-center">
          <SettingBox onClick={() => router.push('/my/setting')}>
            <Image
              src={'/svg/setting.svg'}
              width={18}
              height={18}
              alt="setting"
            />
            <span className="flex items-center text-caption2">설정</span>
          </SettingBox>
        </div>
      </GreetingBox>
      <ItemsContainer>
        {SettingItems.map(({ id, text, icon, path }) => (
          <SettingItem key={id} text={text} icon={icon} path={path} />
        ))}
      </ItemsContainer>
      <DivisionBar></DivisionBar>
      <ListsContainer>
        {SettingLists.map(({ id, text, path }) => (
          <SettingList key={id} text={text} path={path} />
        ))}
      </ListsContainer>
      <DivisionBar></DivisionBar>
    </PageLayout>
  );
};

export default My;
