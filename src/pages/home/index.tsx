import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';
import Category from '@components/home/Category';
import ResearchButton from '@components/home/ResearchButton';
import TrackerButton from '@components/home/TrackerButton';

const Home = () => {
  return (
    <PageLayout>
      <NavBar area="지도 지역명" isRight={true} />
      <Category />
      <ResearchButton />
      <TrackerButton />
    </PageLayout>
  );
};

export default Home;
