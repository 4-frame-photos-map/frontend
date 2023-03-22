import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import React from 'react';

interface SettingItemProps {
  text: string;
  path: string;
  icon: string;
}

interface DefaultProps {
  className?: React.ComponentProps<'div'>['className'];
}

const SettingItemBox = tw.div<DefaultProps>`
flex flex-col justify-center items-center cursor-pointer w-[74px]
`;

export default function Activity({ text, path, icon }: SettingItemProps) {
  const router = useRouter();
  return (
    <SettingItemBox
      onClick={() => {
        router.push(`${path}`);
      }}
    >
      <Image src={icon} alt={`${icon}`} width={32} height={20} />
      <span className="mt-1 text-caption1 font-normal">{text}</span>
    </SettingItemBox>
  );
}
