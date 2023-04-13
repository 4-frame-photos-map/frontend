/* eslint-disable tailwindcss/classnames-order */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import FavoriteButton from '@components/wish/FavoriteButton';
import Search from '@components/navbar/Search';

type NavBarProps = {
  title?: string;
  area?: string;
  isLeft?: boolean;
  isRight?: boolean;
  isDetail?: boolean;
  shopId?: number;
};

const NavBar = ({
  title,
  area,
  isLeft,
  isRight,
  isDetail,
  shopId,
}: NavBarProps) => {
  const router = useRouter();
  const [isInput, setIsInput] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const [isMap, setIsMap] = useState<boolean>(false);

  const handleCloseInput = () => {
    setIsInput(false);
  };
  const handleOpenInput = () => {
    setIsInput(true);
  };

  return (
    <NavContainer>
      <NavItems>
        {isInput ? (
          <>
            {!isMap && !isList && (
              <Image
                src={'/svg/navbar/prev.svg'}
                width={24}
                height={24}
                alt="이전"
                className="z-[900] cursor-pointer"
                onClick={handleCloseInput}
              />
            )}
            {isMap && (
              <>
                <div
                  className="flex flex-col items-center ml-1"
                  onClick={() => {
                    setIsMap(false);
                    setIsList(true);
                  }}
                >
                  <Image
                    src="/svg/navbar/list.svg"
                    width={24}
                    height={24}
                    alt="list"
                    className="z-[899] cursor-pointer"
                  />
                  <span className="text-caption1 text-status-error">목록</span>
                </div>
              </>
            )}
            {isList && (
              <>
                <div
                  className="flex flex-col items-center ml-1"
                  onClick={() => {
                    setIsList(false);
                    setIsMap(true);
                  }}
                >
                  <Image
                    src="/svg/navbar/map.svg"
                    width={24}
                    height={24}
                    alt="map"
                    className="z-[899] cursor-pointer"
                  />
                  <span className="text-caption1 text-status-error">지도</span>
                </div>
              </>
            )}
            <Search isList={isList} setIsList={setIsList} isMap={isMap} />
          </>
        ) : null}

        {isLeft && !isInput && (
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
        )}
        {Area && !isInput && <Area>{area}</Area>}
        {title && <Title>{title}</Title>}
        {isRight && !isDetail ? (
          isInput ? null : (
            <Image
              src={'/svg/navbar/search.svg'}
              alt="검색"
              width={24}
              height={24}
              className="right-0 z-[999] cursor-pointer"
              onClick={handleOpenInput}
            />
          )
        ) : null}
        {isRight && isDetail && shopId ? (
          <FavoriteButton shopId={shopId} />
        ) : null}
      </NavItems>
    </NavContainer>
  );
};

const NavContainer = tw.nav`
fixed top-0 w-full bg-bg-secondary max-w-[375px] box-border z-[900] h-[68px]`;

const NavItems = tw.div`
mx-[16px] flex items-center justify-between h-full pt-1
`;

const Area = tw.span`
text-[18px] font-semibold
`;

const Title = tw.span`
absolute inset-x-0 mx-0 my-auto text-center text-[18px] font-semibold
`;

export default NavBar;
