import tw from 'tailwind-styled-components';

type ButtonProps = {
  text?: string;
  isRightButton?: boolean;
  rightText?: string;
  disabled?: boolean;
  handleButton?: () => void;
  handleRightButton?: () => void;
  className?: React.ComponentProps<'div'>['className'];
};

const Button = ({
  text = '이용리뷰 작성하기',
  isRightButton,
  rightText = '작성 완료하기',
  disabled,
  handleButton,
  handleRightButton,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonLayout {...rest}>
      {isRightButton ? (
        <>
          <LeftButton className="bg-fill-strong" onClick={handleButton}>
            {text}
          </LeftButton>
          <RightButton disabled={disabled} onClick={handleRightButton}>
            {rightText}
          </RightButton>
        </>
      ) : (
        <LeftButton disabled={disabled} onClick={handleButton}>
          {text}
        </LeftButton>
      )}
    </ButtonLayout>
  );
};

const ButtonLayout = tw.section`
fixed bottom-0 flex w-full max-w-[375px] cursor-pointer justify-center px-4 text-center text-title1 font-extralight text-[#FFFFFF]
`;
const RightButton = tw.button`
${({ disabled }) => (disabled ? 'bg-fill-disable' : 'bg-primary-normal')}
w-full py-3
`;
const LeftButton = tw.button`
${({ disabled }) => (disabled ? 'bg-fill-disable' : 'bg-primary-normal')}
w-full py-3
`;
export default Button;
