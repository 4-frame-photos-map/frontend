import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  status?: string;
  leftValue: string;
  rightValue: string;
  setValue: UseFormReturn['setValue'];
};

const Checkbox = ({
  id,
  label,
  status,
  leftValue,
  rightValue,
  setValue,
}: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <CheckboxTitle>{label}</CheckboxTitle>
      <Label>
        <CheckboxInner>
          <Image
            src={
              status === 'GOOD'
                ? '/svg/checkbox_active.svg'
                : '/svg/checkbox_blank.svg'
            }
            width={20}
            height={20}
            alt="체크박스"
          />
          <span>{leftValue}</span>
          <CheckboxInput
            type="checkbox"
            id={id}
            value="GOOD"
            checked={status === 'GOOD' ? true : false}
            onChange={() => setValue(id, 'GOOD')}
          />
        </CheckboxInner>
      </Label>
      <Label>
        <CheckboxInner>
          <Image
            src={
              status === 'BAD'
                ? '/svg/checkbox_active.svg'
                : '/svg/checkbox_blank.svg'
            }
            width={20}
            height={20}
            alt="체크박스"
          />
          <span>{rightValue}</span>
          <CheckboxInput
            type="checkbox"
            id={id}
            value="BAD"
            checked={status === 'BAD' ? true : false}
            onChange={() => setValue(id, 'BAD')}
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
flex mb-3 cursor-pointer
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
