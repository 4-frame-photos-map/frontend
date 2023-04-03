import tw from 'tailwind-styled-components';
import Image from 'next/image';
import type { UseFormRegisterReturn } from 'react-hook-form';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  register?: UseFormRegisterReturn;
  status: string[] | string | undefined;
};

const Checkbox = ({ id, label, register, status }: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <CheckboxTitle>{label}</CheckboxTitle>
      <Label>
        <CheckboxInner>
          <Image
            src={
              status?.[0] === 'GOOD'
                ? '/svg/checkbox_active.svg'
                : '/svg/checkbox_blank.svg'
            }
            width={20}
            height={20}
            alt="체크박스"
          />
          <span>좋음</span>
          <CheckboxInput
            type="checkbox"
            id={id}
            value="GOOD"
            checked={status?.[0] === 'GOOD' ? true : false}
            {...register}
          />
        </CheckboxInner>
      </Label>
      <Label>
        <CheckboxInner>
          <Image
            src={
              status?.[0] === 'BAD'
                ? '/svg/checkbox_active.svg'
                : '/svg/checkbox_blank.svg'
            }
            width={20}
            height={20}
            alt="체크박스"
          />
          <span>나쁨</span>
          <CheckboxInput
            type="checkbox"
            id={id}
            value="BAD"
            checked={status?.[0] === 'BAD' ? true : false}
            {...register}
          />
        </CheckboxInner>
      </Label>
    </CheckboxContainer>
  );
};

const CheckboxContainer = tw.div`
flex
`;
const Label = tw.label`
flex mb-3
`;
const CheckboxTitle = tw.span`
text-body1 font-semibold w-[56px] mr-3
`;
const CheckboxInner = tw.div`
flex mr-2
`;
const CheckboxInput = tw.input`
hidden
`;

export default Checkbox;
