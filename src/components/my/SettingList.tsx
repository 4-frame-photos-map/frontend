import Image from 'next/image';
import { useRouter } from 'next/router';

interface SettingItemProps {
  text: string;
  path: string;
}

export default function SettingList({ text, path }: SettingItemProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`${path}`)}
      className="flex justify-between py-[8px]"
    >
      <span>{text}</span>
      <Image src={'/svg/right.svg'} width={24} height={24} alt="arrow" />
    </div>
  );
}
