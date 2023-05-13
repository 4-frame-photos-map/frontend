import MetaHead from '@components/common/MetaHead';
import PageLayout from '@components/layout/PageLayout';

const Notice = () => {
  return (
    <PageLayout>
      <MetaHead
        title={'공지 사항 | 네컷 지도'}
        description={'네컷 지도의 공지 사항 페이지입니다.'}
      />
      Notice
    </PageLayout>
  );
};

export default Notice;
