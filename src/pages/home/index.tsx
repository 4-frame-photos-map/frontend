import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';
import { useState } from 'react';

const Home = () => {
  const [isInput, setIsInput] = useState<boolean>(false);
  const handleRightNav = () => {
    setIsInput(true);
  };

  const handleLeftNav = () => {
    setIsInput(false);
  };
  return (
    <PageLayout>
      <NavBar
        left_nav="지도지역명"
        isRight_nav={true}
        isSearch={true}
        isInput={isInput}
        handleRightNav={handleRightNav}
        handleLeftNav={handleLeftNav}
      />
      Home
    </PageLayout>
  );
};

export default Home;
