import tw from 'tailwind-styled-components';

type BrandTagProps = {
  name: string;
};

const BrandTag = ({ name }: BrandTagProps) => {
  const brandNames = ['인생네컷', '하루필름', '포토이즘', '포토그레이'];
  return (
    <BadgeContainer
      className={`bg-brand-others ${
        name?.includes(brandNames[0]) && 'bg-brand-pink'
      } ${name?.includes(brandNames[1]) && 'bg-brand-blue'} ${
        name?.includes(brandNames[2]) && 'bg-brand-black'
      }  ${name?.includes(brandNames[3]) && 'bg-brand-gray'}`}
    >
      {
        <span
          className={`text-center text-[10px] ${
            brandNames.find((brandName) => name?.includes(brandName)) &&
            'text-white'
          } text-black`}
        >
          {brandNames.find((brandName) => name?.includes(brandName)) || '기타'}
        </span>
      }
    </BadgeContainer>
  );
};

const BadgeContainer = tw.h3`
flex h-[14px] w-[44px] items-center justify-center rounded-[2px]
`;

export default BrandTag;
