import tw from 'tailwind-styled-components';
import Header from '@components/common/Header';
import PageLayout from '@components/layout/PageLayout';
import NoticeItem from '@components/notice/NoticeItem';
import Seo from '@components/common/Seo';
import { noticeState } from '@recoil/noticeAtom';
import { useRecoilState } from 'recoil';
import { NOTICE_LIST } from '@constants/noticeLists';

const Notice = () => {
  const [isNoticeView, setIsNoticeView] = useRecoilState<{
    notice1: boolean;
  }>(noticeState);
  return (
    <PageLayout>
      <Seo title="공지사항" url="notice" />
      <Header isLeft={true} centerTitle="공지사항" />
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
