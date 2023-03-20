import tw from 'tailwind-styled-components';
import React from 'react';

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayoutBox = tw.div`
relative h-full w-full min-h-screen max-w-[375px] bg-bg-primary
`;

const PageLayout = ({ children }: PageLayoutProps) => {
  return <PageLayoutBox>{children}</PageLayoutBox>;
};

export default PageLayout;
