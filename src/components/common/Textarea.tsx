import tw from 'tailwind-styled-components';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

const Textarea = ({ label, placeholder, register, ...rest }: TextareaProps) => {
  return (
    <TextareaBox htmlFor="content">
      <Label>
        <TextareaTitle>{label}</TextareaTitle>
        <span className="ml-[2px] text-status-error">*</span>
      </Label>
      <TextareaInner
        id="content"
        maxLength={100}
        placeholder={placeholder}
        {...register}
        {...rest}
      />
    </TextareaBox>
  );
};

const TextareaBox = tw.label`
mb-1 flex flex-col
`;
const Label = tw.div`
flex mb-1
`;
const TextareaTitle = tw.span`
text-body1 font-semibold
`;
const TextareaInner = tw.textarea`
h-[140px] w-full rounded-lg border border-text-assitive p-1 text-label2 focus:outline-0
`;

export default Textarea;
