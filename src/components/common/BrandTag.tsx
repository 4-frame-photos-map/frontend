import tw from 'tailwind-styled-components';

type BrandTagProps = {
  name: string;
  className?: React.ComponentProps<'div'>['className'];
};

const BrandTag = ({ name, ...rest }: BrandTagProps) => {
  return (
    <BadgeContainer {...rest}>
      <span className="text-center text-[10px]">{name.split(' ')[0]}</span>
    </BadgeContainer>
  );
};

const BadgeContainer = tw.div`
flex h-[14px] max-w-[44px] items-center justify-center rounded-[2px]
`;

export default BrandTag;
