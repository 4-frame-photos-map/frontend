import Image from 'next/image';
import Link from 'next/link';

interface SettingItemProps {
  text: string;
  path: string;
}

export default function SettingList({ text, path }: SettingItemProps) {
  return (
    <li>
      <Link href={path} className="flex justify-between py-[8px]">
        {text}
        <Image src={'/svg/right.svg'} width={24} height={24} alt="arrow" />
      </Link>
    </li>
  );
}
