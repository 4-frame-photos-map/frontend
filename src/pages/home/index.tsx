import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';

const Home = () => {
  return (
    <PageLayout>
      <NavBar area="지도 지역명" isRight={true} />
      Home
    </PageLayout>
  );
};

export default Home;
