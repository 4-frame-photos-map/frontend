import tw from 'tailwind-styled-components';
import React from 'react';

type ReviewLayoutProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
};

const ReviewLayoutBox = tw.div`
relative h-full w-full min-h-screen max-w-[375px] bg-bg-primary
`;

const ReviewLayout = ({ children, ...rest }: ReviewLayoutProps) => {
  return <ReviewLayoutBox {...rest}>{children}</ReviewLayoutBox>;
};

export default ReviewLayout;
