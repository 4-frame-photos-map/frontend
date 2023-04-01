import tw from 'tailwind-styled-components';
import React from 'react';

type ShopLayoutProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
};

const ShopLayoutBox = tw.div`
relative h-full w-full min-h-screen max-w-[375px] bg-bg-primary
`;

const ShopLayout = ({ children, ...rest }: ShopLayoutProps) => {
  return <ShopLayoutBox {...rest}>{children}</ShopLayoutBox>;
};

export default ShopLayout;
