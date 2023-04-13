import tw from 'tailwind-styled-components';

type DivisionBarProps = {
  className?: React.ComponentProps<'div'>['className'];
};

const DivisionBar = ({ ...rest }: DivisionBarProps) => {
  return <Bar {...rest} />;
};

const DivisionWrapper = tw.div`
flex justify-center
`;

const Bar = tw.div`
flex justify-center ml-12 mr-2 h-[1px] w-full bg-line-alternative 
`;

export default DivisionBar;
