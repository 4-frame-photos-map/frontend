import NavBar from '@components/navbar/NavBar';
import PageLayout from '@components/layout/PageLayout';

const Location = () => {
  return (
    <PageLayout>
      <NavBar area="지도 지역명" isRight={true} />
      Location
    </PageLayout>
  );
};

export default Location;
