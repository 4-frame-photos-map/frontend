import NavBar from '@/components/common/NavBar';
import PageLayout from '@/components/common/PageLayout';

const Location = () => {
  return (
    <PageLayout>
      <NavBar title={'지도 지역명'} isLocation={true} />
      Location
    </PageLayout>
  );
};

export default Location;
