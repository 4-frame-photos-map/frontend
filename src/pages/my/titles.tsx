import MetaHead from '@components/common/MetaHead';
import NavBar from '@components/common/NavBar';
import PageLayout from '@components/layout/PageLayout';

const Titles = () => {
  return (
    <PageLayout>
      <MetaHead
        title={'내 칭호 | 네컷 지도'}
        description={'네컷 지도의 내 칭호 페이지입니다.'}
      />
      <NavBar centerTitle="내 칭호" isLeft={true} />
      Titles
    </PageLayout>
  );
};

export default Titles;
