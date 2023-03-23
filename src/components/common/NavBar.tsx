import Image from 'next/image';
import tw from 'tailwind-styled-components';

type NavBarProps = {
  left_nav?: string;
  title?: string;
  right_nav?: React.ReactNode;
  isRight_nav?: boolean;
  isSearch?: boolean;
  isInput?: boolean;
  handleLeftNav?: () => void;
  handleRightNav?: () => void;
  [key: string]: any;
};

const NavContainer = tw.div`
w-full bg-bg-secondary py-3 px-5 flex items-center justify-between
`;

const NavLeft = tw.div`
z-[900] cursor-pointer
`;

const NavCenter = tw.div`
absolute inset-x-0 mx-0 my-auto text-center text-title2
`;

const NavRight = tw.div`
right-0 z-[900] cursor-pointer
`;

const NavInput = tw.input`
basis-5/6 bg-[#F2F2F7] rounded-[20px] pl-2
`;

const NavBar = ({
  left_nav,
  right_nav,
  title,
  isRight_nav,
  isSearch,
  isInput,
  handleLeftNav,
  handleRightNav,
  ...rest
}: NavBarProps) => {
  return (
    <NavContainer {...rest}>
      {isInput ? (
        <>
          <NavLeft onClick={handleLeftNav}>
            <Image
              src={'/svg/navbar/prev.svg'}
              width={24}
              height={24}
              alt="이전"
            />
          </NavLeft>
          <NavInput type="text" name="" id="" />
        </>
      ) : (
        <>
          <NavLeft onClick={handleLeftNav}>
            {left_nav ? (
              <span>{left_nav}</span>
            ) : (
              <Image
                src={'/svg/navbar/prev.svg'}
                width={24}
                height={24}
                alt="이전"
              />
            )}
          </NavLeft>
          <NavCenter>{title && <span>{title}</span>}</NavCenter>
          <NavRight onClick={handleRightNav}>
            {isRight_nav ? (
              isSearch ? (
                <Image
                  src={'/svg/navbar/search.svg'}
                  alt="검색"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src={'/svg/menu/filled-bookmark.svg'}
                  alt="저장"
                  width={24}
                  height={24}
                />
              )
            ) : (
              <></>
            )}
          </NavRight>
        </>
      )}
    </NavContainer>
  );
};

export default NavBar;
