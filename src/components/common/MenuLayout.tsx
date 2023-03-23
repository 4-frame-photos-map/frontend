import React from 'react';
import Menu from './Menu';

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
