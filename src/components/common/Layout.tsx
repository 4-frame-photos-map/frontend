import React from 'react';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
