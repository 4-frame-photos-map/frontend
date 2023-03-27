import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';

const Wish = () => {
  return (
    <PageLayout>
      <NavBar title={'저장'} isRight={true} isLeft={true} />
      Wish
    </PageLayout>
  );
};

export default Wish;
