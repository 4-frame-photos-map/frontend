import NavBar from '@components/common/NavBar';
import PageLayout from '@components/layout/PageLayout';

const Titles = () => {
  return (
    <PageLayout>
      <NavBar title="내 칭호" isLeft={true} />
      Titles
    </PageLayout>
  );
};

export default Titles;
