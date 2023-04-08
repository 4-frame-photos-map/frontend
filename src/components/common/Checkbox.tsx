import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  status?: string;
  isSet?: boolean;
  leftValue: string;
  rightValue: string;
  setIsSet?: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormReturn['setValue'];
};

const Checkbox = ({
  id,
  label,
  status,
  isSet = false,
  leftValue,
  rightValue,
  setIsSet,
  setValue,
}: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <CheckboxTitle>{label}</CheckboxTitle>
      <Label>
        <CheckboxInner>
          {isSet ? (
            <Image
              src={
                status === 'GOOD'
                  ? '/svg/checkbox_disable.svg'
                  : '/svg/checkbox_blank.svg'
              }
              width={20}
              height={20}
              alt="체크박스"
            />
          ) : (
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
          )}
          <span>{leftValue}</span>
          <CheckboxInput
            type="checkbox"
            id={id}
            value="GOOD"
            checked={status === 'GOOD' ? true : false}
            onChange={() => {
              setValue(id, 'GOOD');
              if (setIsSet) {
                setIsSet(false);
              }
            }}
          />
        </CheckboxInner>
      </Label>
      <Label>
        <CheckboxInner>
          {isSet ? (
            <Image
              src={
                status === 'BAD'
                  ? '/svg/checkbox_disable.svg'
                  : '/svg/checkbox_blank.svg'
              }
              width={20}
              height={20}
              alt="체크박스"
            />
          ) : (
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
          )}
          <span>{rightValue}</span>
          <CheckboxInput
            type="checkbox"
            id={id}
            value="BAD"
            checked={status === 'BAD' ? true : false}
            onChange={() => {
              setValue(id, 'BAD');
              if (setIsSet) {
                setIsSet(false);
              }
            }}
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
