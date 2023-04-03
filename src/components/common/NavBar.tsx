import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const { register, watch, setValue } = useForm();

  const handleCloseInput = () => {
    setInput(false);
  };
  const handleOpenInput = () => {
    setInput(true);
  };

  const handleClearValue = () => {
    setValue('search', '');
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
            <SearchInput
              {...register('search')}
              type="text"
              placeholder="지점/장소 검색"
            />
            {watch('search') && (
              <Image
                src="/svg/navbar/clear-button.svg"
                width={24}
                height={24}
                alt="삭제"
                className="absolute right-8 z-[999] cursor-pointer"
                onClick={handleClearValue}
              />
            )}
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
              className="right-0 z-[999] cursor-pointer"
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
fixed top-0 w-full bg-bg-secondary py-[18px] max-w-[375px] box-border h-16 z-[999]`;

const NavItems = tw.div`
mx-[16px] flex items-center justify-between h-full
`;

const Area = tw.span`
text-[18px] font-semibold
`;

const Title = tw.span`
absolute inset-x-0 mx-0 my-auto text-center text-[18px] font-semibold
`;

const SearchInput = tw.input`
basis-5/6 bg-bg-primary rounded-[100px] px-[12px] py-[7px] z-[900] mr-[7px] relative
`;

export default NavBar;
