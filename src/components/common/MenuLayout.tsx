import React from 'react';
import Menu from '@components/common/Menu';

type MenuLayoutProps = {
  children: React.ReactNode;
};

const MenuLayout = ({ children }: MenuLayoutProps) => {
  return (
    <>
      <div>{children}</div>
      <Menu />
    </>
  );
};

export default MenuLayout;
