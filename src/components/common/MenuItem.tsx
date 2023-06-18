import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { MenuListType } from '@components/common/Menu';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MenuItem = ({ name, path }: Pick<MenuListType, 'name' | 'path'>) => {
  const router = useRouter();
  return (
    <div className="flex h-full items-center justify-center px-8 text-[10px]">
      <Link href={path}>
        <MenuItemContainer>
          <Image
            src={
              router.pathname.includes(`/${path}`)
                ? `/svg/menu/filled-${path}.svg`
                : `/svg/menu/lined-${path}.svg`
            }
            width={24}
            height={24}
            alt="home"
          />
          <p
            className={`whitespace-nowrap text-[10px] font-normal leading-[10px] ${
              router.pathname.includes(`/${path}`)
                ? 'text-black'
                : 'text-text-assitive'
            }`}
          >
            {name}
          </p>
        </MenuItemContainer>
      </Link>
    </div>
  );
};

const MenuItemContainer = tw.div`
flex flex-col items-center gap-y-1
`;

export default MenuItem;
