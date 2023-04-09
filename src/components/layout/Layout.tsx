import React from 'react';
import tw from 'tailwind-styled-components';

type Props = {
  children: React.ReactNode;
};

const LayoutBox = tw.div`
flex justify-center w-screen h-full font-Pretendard overflow-x-hidden overflow-y-hidden
`;

const Layout = ({ children }: Props) => {
  return <LayoutBox>{children}</LayoutBox>;
};

export default Layout;
