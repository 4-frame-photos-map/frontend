import tw from 'tailwind-styled-components';
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayoutBox = tw.div`
relative flex h-full min-h-screen w-full max-w-[375px] items-center bg-white justify-center flex-col
`;

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <AuthLayoutBox>{children}</AuthLayoutBox>;
};

export default AuthLayout;
