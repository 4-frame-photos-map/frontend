import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';

const Location = () => {
  return (
    <PageLayout>
      <NavBar area="지도 지역명" isSearch={true} isRight={true} />
      Location
    </PageLayout>
  );
};

export default Location;
