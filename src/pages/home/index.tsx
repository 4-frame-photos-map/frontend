import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';
import Category from '@components/home/Category';
import Research from '@components/home/Research';
import Tracker from '@components/home/Tracker';

const Home = () => {
  return (
    <PageLayout>
      <NavBar area="지도 지역명" isRight={true} />
      <Category />
      <Research />
      <Tracker />
    </PageLayout>
  );
};

export default Home;
