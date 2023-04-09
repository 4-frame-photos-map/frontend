import NavBar from '@components/common/NavBar';
import PageLayout from '@components/layout/PageLayout';

const Location = () => {
  return (
    <PageLayout>
      <NavBar area="지도 지역명" isSearch={true} isRight={true} />
      Location
    </PageLayout>
  );
};

export default Location;
