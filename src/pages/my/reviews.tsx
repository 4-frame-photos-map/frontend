import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';

const Reviews = () => {
  return (
    <PageLayout>
      <NavBar title="내 후기" isLeft={true} />
      Reviews
    </PageLayout>
  );
};

export default Reviews;
