import tw from 'tailwind-styled-components';

type BrandTagProps = {
  name: string;
};

const BrandTag = ({ name }: BrandTagProps) => {
  return (
    <BadgeContainer
      className={`${name.includes('인생네컷') && 'bg-brand-purple'} ${
        name.includes('하루필름') && 'bg-brand-yellow'
      } ${name.includes('포토이즘') && 'bg-brand-green'}  ${
        name.includes('포토그레이') && 'bg-brand-pink'
      }`}
    >
      <span className="text-center text-[10px]">{name.split(' ')[0]}</span>
    </BadgeContainer>
  );
};

const BadgeContainer = tw.div`
flex h-[14px] max-w-[44px] items-center justify-center rounded-[2px]
`;

export default BrandTag;
