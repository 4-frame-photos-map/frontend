import tw from 'tailwind-styled-components';
import React from 'react';
import Menu from './Menu';

type PageLayoutProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
};

const PageLayoutBox = tw.div`
relative h-full w-full min-h-screen max-w-[375px] bg-bg-primary
`;

const PageLayout = ({ children, ...rest }: PageLayoutProps) => {
  return (
    <PageLayoutBox {...rest}>
      {children}
      <Menu />
    </PageLayoutBox>
  );
};

export default PageLayout;
