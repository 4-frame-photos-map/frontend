import Image from 'next/image';
import tw from 'tailwind-styled-components';

type TitleBadgeProps = {
  name: string;
  className?: React.ComponentProps<'div'>['className'];
};

const TitleBadge = ({ name, ...rest }: TitleBadgeProps) => {
  return (
    <TitleBadgeBox {...rest} name={name}>
      <span>{name}</span>
    </TitleBadgeBox>
  );
};

const TitleBadgeBox = tw.div<TitleBadgeProps>`
${({ name }) =>
  (name === '뉴비' && 'bg-[#6DFF39]') ||
  (name === '찜 첫 걸음' && 'bg-[#FFA6A6]') ||
  (name === '찜 홀릭' && 'bg-[#FF5A5A]') ||
  (name === '리뷰 홀릭' && 'bg-[#86A1FF]') ||
  (name === '리뷰 첫 걸음' && 'bg-[#BDD6FF]')}
rounded-full flex justify-center items-center border-[1px] border-primary-normal font-semibold text-primary-normal whitespace-nowrap shadow-[2px_2px_4px_0px_rgba(0,0,0,0.16)]
`;

export default TitleBadge;
