import Image from 'next/image';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import React from 'react';

interface SettingItemProps {
  text: string;
  path: string;
  icon: string;
}

interface DefaultProps {
  className?: React.ComponentProps<'div'>['className'];
}

export default function SettingItem({ text, path, icon }: SettingItemProps) {
  return (
    <SettingItemBox>
      <Link href={path} className="flex flex-col items-center justify-center">
        <Image src={icon} alt={`${icon}`} width={32} height={20} />
        <span className="mt-1 text-caption1 font-normal">{text}</span>
      </Link>
    </SettingItemBox>
  );
}

const SettingItemBox = tw.li<DefaultProps>`
flex flex-col justify-center items-center cursor-pointer w-[74px]
`;
