import Image from 'next/image';
import { useRouter } from 'next/router';

type NavBarProps = {
  title: string;
  isHome?: boolean;
  isClicked?: boolean;
  isDetail?: boolean;
  isMy?: boolean;
  isWish?: boolean;
  isLocation?: boolean;
};

const NavBar = ({
  title,
  isHome,
  isLocation,
  isClicked,
  isDetail,
  isMy,
  isWish,
}: NavBarProps) => {
  const router = useRouter();
  return (
    <div className="top-0 w-full bg-bg-secondary py-[18px]">
      <div className="mx-[16px] flex items-center justify-between">
        {isClicked || isWish || isDetail || isMy || isLocation ? (
          <Image
            src={'/svg/navbar/prev.svg'}
            width={24}
            height={24}
            alt="이전"
            className="z-[999] cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />
        ) : (
          ''
        )}
        {isWish || isMy ? (
          <span className="absolute inset-x-0 mx-0 my-auto text-center text-title2">
            {title}
          </span>
        ) : (
          <span className="left-0 text-title2">{title}</span>
        )}
        {isClicked || isDetail || isMy ? (
          ''
        ) : isWish ? (
          <Image
            src={'/svg/menu/filled-bookmark.svg'}
            alt="검색"
            width={24}
            height={24}
            className="right-0 z-[999] cursor-pointer"
          />
        ) : (
          <Image
            src={'/svg/navbar/search.svg'}
            alt="검색"
            width={24}
            height={24}
            className="right-0 z-[999] cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
