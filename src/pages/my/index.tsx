import Image from 'next/image';
import tw from 'tailwind-styled-components';
import Header from '@components/common/Header';
import PageLayout from '@components/layout/PageLayout';
import SettingItem from '@components/my/SettingItem';
import SettingList from '@components/my/SettingList';
import TitleBadge from '@components/title/TitleBadge';
import Link from 'next/link';
import { useGetProfile } from '@hooks/queries/useGetProfile';
import Seo from '@components/common/Seo';

export type SettingListsProps = {
  id: number;
  text: string;
  path: string;
};

type SettingItemsProps = SettingListsProps & {
  icon: string;
};

const SettingItems: SettingItemsProps[] = [
  { id: 1, text: '내 리뷰', icon: '/svg/review.svg', path: '/my/reviews' },
  { id: 2, text: '내 칭호', icon: '/svg/title.svg', path: '/my/titles' },
  { id: 3, text: '공지사항', icon: '/svg/notice.svg', path: '/notice' },
];

const SettingLists: SettingListsProps[] = [
  { id: 1, text: '문의사항', path: '/faq' },
];

const My = () => {
  const { data: user } = useGetProfile();
  return (
    <PageLayout className="bg-white">
      <Seo title="마이페이지" url="my" />
      <Header centerTitle="마이페이지" isLeft={true} />
      <div className="mt-[73px] px-4">
        <TitleBadge
          className="h-fit w-fit px-3 py-1 text-label2"
          name={user?.main_member_title as string}
        />
      </div>
      <GreetingBox>
        <Greeting>
          <div className="flex items-center">
            <span className="font-semibold">{user?.nickname}</span>님
            안녕하세요!
          </div>
        </Greeting>
        <div className="flex items-center">
          <Link href={'/my/setting'}>
            <SettingBox>
              <Image
                src={'/svg/setting.svg'}
                width={18}
                height={18}
                alt="setting"
              />
              <span className="flex items-center text-caption2">설정</span>
            </SettingBox>
          </Link>
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

const GreetingBox = tw.div`
flex h-[50px] justify-between px-[16px]
`;

const Greeting = tw.div`
flex text-title1 font-normal
`;

const SettingBox = tw.div`
flex cursor-pointer rounded-xl border bg-bg-tertiary p-1
`;

const ItemsContainer = tw.ul`
flex w-full justify-between px-[16px] py-[24px]
`;

const ListsContainer = tw.ul`
flex cursor-pointer flex-col px-[16px] text-body2 font-normal
`;

const DivisionBar = tw.div`
h-[4px] w-full bg-bg-primary
`;

export default My;
