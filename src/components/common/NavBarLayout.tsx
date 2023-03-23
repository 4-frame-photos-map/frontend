import React from 'react';
import NavBar from './NavBar';

type NavBarLayoutProps = {
  children: React.ReactNode;
  title: string;
  isHome?: boolean;
  isClicked?: boolean;
  isDetail?: boolean;
  isMy?: boolean;
  isWish?: boolean;
  isLocation?: boolean;
};

const NavBarLayout = ({
  children,
  title,
  isHome,
  isLocation,
  isClicked,
  isDetail,
  isMy,
  isWish,
}: NavBarLayoutProps) => {
  return (
    <>
      <NavBar
        title={title}
        isMy={isMy}
        isHome={isHome}
        isLocation={isLocation}
        isClicked={isClicked}
        isDetail={isDetail}
        isWish={isWish}
      />
      <div>{children}</div>
    </>
  );
};

export default NavBarLayout;
