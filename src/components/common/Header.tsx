import tw from 'tailwind-styled-components';
import Image from 'next/image';
import FavoriteButton from '@components/wish/FavoriteButton';
import Search from '@components/header/Search';
import { useRouter } from 'next/router';
import { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { boundState } from '@recoil/boundAtom';

type HeaderProps = {
  leftTitle?: string;
  centerTitle?: string;
  isLeft?: boolean;
  isRight?: boolean;
  isDetail?: boolean;
  shopId?: number;
  isFavorite?: boolean;
  location?: Position;
  kakaoMap?: any;
  isWish?: boolean;
  favoritesNum?: number;
  setIsInfo?: Dispatch<SetStateAction<boolean>>;
  setShopsInfo?: Dispatch<SetStateAction<ShopProps[] | undefined>>;
  setCurShopsInfo?: Dispatch<SetStateAction<ShopProps[] | undefined>>;
  setModalProps?: Dispatch<SetStateAction<ShopProps | null>>;
};

const Header = ({
  leftTitle,
  centerTitle,
  isLeft,
  isRight,
  isDetail,
  shopId,
  isFavorite,
  location,
  kakaoMap,
  isWish,
  favoritesNum,
  setIsInfo,
  setShopsInfo,
  setCurShopsInfo,
  setModalProps,
}: HeaderProps) => {
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

  const handleTitleInfo = () => {
    if (setIsInfo) {
      return setIsInfo((prev) => !prev);
    }
  };

  useEffect(() => {
    if (kakaoMap && isBound) {
      kakaoMap.setBounds(bounds);
      setIsBound(() => false);
    }
  }, [bounds]);

  return (
    <HeaderContainer>
      <HeaderItems>
        {isInput ? (
          <>
            {!isMap && !isList && (
              <Image
                src={'/svg/header/prev.svg'}
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
                    src="/svg/header/list.svg"
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
                    setCurShopsInfo?.(shopInfo);
                    if (setModalProps) {
                      setModalProps(null);
                    }
                  }}
                >
                  <Image
                    src="/svg/header/map.svg"
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
                setShopsInfo={setShopInfo}
              />
            )}
          </>
        ) : null}

        {isLeft && !isInput && (
          <>
            <Image
              src={'/svg/header/prev.svg'}
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
        {leftTitle && !isInput ? (
          <LeftTitle>{leftTitle}</LeftTitle>
        ) : (
          <div></div>
        )}
        {centerTitle && <CenterTitle>{centerTitle}</CenterTitle>}
        {isRight && !isDetail ? (
          isInput ? null : (
            <Border className="cursor-pointer" onClick={handleOpenInput}>
              <Image
                src={'/svg/header/search.svg'}
                alt="검색"
                width={16}
                height={16}
                className="right-0 z-[999]"
              />
              <span className="text-caption1 font-semibold">검색</span>
            </Border>
          )
        ) : null}
        {isDetail && shopId && (
          <FavoriteButton shopId={shopId} isFavorite={isFavorite} />
        )}
        {isWish && (
          <Border>
            <span className="text-caption1 font-semibold">
              총 {favoritesNum}개
            </span>
          </Border>
        )}
        {centerTitle === '내 칭호' && (
          <div className="z-[999] cursor-pointer" onClick={handleTitleInfo}>
            <Image
              src="/svg/header/info.svg"
              width={24}
              height={24}
              alt="칭호 정보"
            />
          </div>
        )}
      </HeaderItems>
    </HeaderContainer>
  );
};

const HeaderContainer = tw.header`
fixed top-0 w-full bg-bg-secondary max-w-[375px] box-border z-[900] h-[68px]`;

const HeaderItems = tw.div`
mx-4 flex items-center justify-between h-full pt-1
`;

const LeftTitle = tw.h1`
text-title2 font-semibold
`;

const CenterTitle = tw.h1`
absolute inset-x-0 mx-0 my-auto text-center text-title2 font-semibold
`;

const Border = tw.div`
flex h-[21px] w-[51px] items-center justify-center gap-x-0.5 rounded-full bg-bg-primary
`;

export default Header;
