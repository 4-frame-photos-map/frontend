import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

type NavBarProps = {
  title?: string;
  area?: string;
  isLeft?: boolean;
  isRight?: boolean;
};

const NavBar = ({ title, area, isLeft, isRight }: NavBarProps) => {
  const router = useRouter();
  const [input, setInput] = useState<boolean>(false);

  const handleCloseInput = () => {
    setInput(false);
  };
  const handleOpenInput = () => {
    setInput(true);
  };

  return (
    <NavContainer>
      <NavItems>
        {input ? (
          <>
            <Image
              src={'/svg/navbar/prev.svg'}
              width={24}
              height={24}
              alt="이전"
              className="z-[900] cursor-pointer"
              onClick={handleCloseInput}
            />
            <SearchInput type="text" className="z-[999]" />
          </>
        ) : isLeft ? (
          <>
            <Image
              src={'/svg/navbar/prev.svg'}
              width={24}
              height={24}
              alt="이전"
              className="z-[900] cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
          </>
        ) : (
          <Area>{area}</Area>
        )}
        {title && <Title>{title}</Title>}
        {isRight ? (
          input ? (
            <></>
          ) : (
            <Image
              src={'/svg/navbar/search.svg'}
              alt="검색"
              width={24}
              height={24}
              className="right-0 z-[900] cursor-pointer"
              onClick={handleOpenInput}
            />
          )
        ) : (
          <></>
        )}
      </NavItems>
    </NavContainer>
  );
};

const NavContainer = tw.nav`
top-0 w-full bg-bg-secondary py-[18px]`;

const NavItems = tw.div`
mx-[16px] flex items-center justify-between
`;

const Area = tw.span`
text-[18px] font-semibold
`;

const Title = tw.span`
absolute inset-x-0 mx-0 my-auto text-center text-title2
`;

const SearchInput = tw.input`
basis-5/6 bg-bg-primary rounded-[20px] pl-2`;

export default NavBar;
