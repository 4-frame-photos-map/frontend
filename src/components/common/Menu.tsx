import tw from 'tailwind-styled-components';
import MenuItem from '@components/common/MenuItem';
import React from 'react';

export type MenuListType = {
  id: number;
  name: '홈' | '내 주변' | '찜 목록' | '마이';
  path: string;
};

const MENU_LIST: MenuListType[] = [
  {
    id: 1,
    name: '홈',
    path: 'home',
  },
  {
    id: 2,
    name: '내 주변',
    path: 'location',
  },
  {
    id: 3,
    name: '찜 목록',
    path: 'wish',
  },
  {
    id: 4,
    name: '마이',
    path: 'my',
  },
];

export default React.memo(function Menu() {
  return (
    <MenuBox>
      <ul className="flex">
        {MENU_LIST.map(({ id, name, path }) => (
          <MenuItem key={id} name={name} path={path} />
        ))}
      </ul>
    </MenuBox>
  );
});

const MenuBox = tw.nav`
fixed bottom-0 z-[900] w-full max-w-[375px] overflow-hidden border-t-[1px] border-line-normal bg-bg-secondary py-[10px] flex justify-center
`;
