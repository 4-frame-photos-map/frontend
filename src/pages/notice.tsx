import tw from 'tailwind-styled-components';
import NavBar from '@components/common/NavBar';
import PageLayout from '@components/layout/PageLayout';
import NoticeItem from '@components/notice/NoticeItem';
import { noticeState } from '@recoil/noticeAtom';
import { useRecoilState } from 'recoil';
import Seo from '@components/common/Seo';

const NOTICE_LIST = [
  { id: 1, title: '공지1', content: '공지1 관련 내용입니다.' },
  { id: 2, title: '공지2', content: '공지2 관련 내용입니다.' },
];

const Notice = () => {
  const [isNoticeView, setIsNoticeView] = useRecoilState<{
    notice1: boolean;
    notice2: boolean;
  }>(noticeState);
  return (
    <PageLayout>
      <Seo title="공지사항" url="notice" />
      <NavBar isLeft={true} centerTitle="공지사항" />
      <NoticeContainer>
        {NOTICE_LIST.map(({ id, title, content }) => (
          <NoticeItem
            key={id}
            title={title}
            content={content}
            isNoticeView={isNoticeView[`notice${id}`]}
            setIsNoticeView={(value) => {
              setIsNoticeView((prevState) => ({
                ...prevState,
                [`notice${id}`]: value,
              }));
            }}
          />
        ))}
      </NoticeContainer>
    </PageLayout>
  );
};

const NoticeContainer = tw.ul`
my-[68px]
`;

export default Notice;
