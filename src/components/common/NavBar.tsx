import tw from 'tailwind-styled-components';
import Image from 'next/image';
import FavoriteButton from '@components/wish/FavoriteButton';
import Search from '@components/navbar/Search';
import { useRouter } from 'next/router';
import { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { boundState } from '@recoil/boundAtom';

type NavBarProps = {
  leftTitle?: string;
  centerTitle?: string;
  isLeft?: boolean;
  isRight?: boolean;
  isDetail?: boolean;
  shopId?: number;
  isFavorite?: boolean;
  location?: Position;
  kakaoMap?: any;
  setShopsInfo?: Dispatch<SetStateAction<ShopProps[] | undefined>>;
};

const NavBar = ({
  leftTitle,
  centerTitle,
  isLeft,
  isRight,
  isDetail,
  shopId,
  isFavorite,
  location,
  kakaoMap,
  setShopsInfo,
}: NavBarProps) => {
  const router = useRouter();
  const [isInput, setIsInput] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const [isMap, setIsMap] = useState<boolean>(false);
  const [shopInfo, setShopInfo] = useState<Shop[]>();
  const [isBound, setIsBound] = useState<boolean>(false);
  const bounds = useRecoilValue(boundState);
  const handleCloseInput = () => {
    setIsInput(false);
  };
  const handleOpenInput = () => {
    setIsInput(true);
  };

  useEffect(() => {
    if (kakaoMap && isBound) {
      kakaoMap.setBounds(bounds);
      setIsBound(() => false);
    }
  }, [bounds]);

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
                  className="ml-1 flex flex-col items-center"
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
            {isList && setShopsInfo && (
              <>
                <div
                  className="ml-1 flex flex-col items-center"
                  onClick={() => {
                    setIsList(false);
                    setIsMap(true);
                    setShopsInfo(shopInfo);
                    setIsBound(true);
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
            {location && (
              <Search
                isList={isList}
                setIsList={setIsList}
                isMap={isMap}
                setIsMap={setIsMap}
                location={location}
                setShopsInfo={setShopInfo}
              />
            )}
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
        {leftTitle &&
        !isInput &&
        location?.lat !== 33.450701 &&
        location?.lng !== 126.570667 ? (
          <LeftTitle>{leftTitle}</LeftTitle>
        ) : (
          <div></div>
        )}
        {centerTitle && <CenterTitle>{centerTitle}</CenterTitle>}
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
        {isDetail && shopId && (
          <FavoriteButton shopId={shopId} isFavorite={isFavorite} />
        )}
      </NavItems>
    </NavContainer>
  );
};

const NavContainer = tw.nav`
fixed top-0 w-full bg-bg-secondary max-w-[375px] box-border z-[900] h-[68px]`;

const NavItems = tw.div`
mx-4 flex items-center justify-between h-full pt-1
`;

const LeftTitle = tw.span`
text-title2 font-semibold
`;

const CenterTitle = tw.span`
absolute inset-x-0 mx-0 my-auto text-center text-title2 font-semibold
`;

export default NavBar;
