import tw from 'tailwind-styled-components';

interface InputProps {
  type: string;
  placeholder: string;
}

const InputBox = tw.div`
w-[300px] bg-[#11F444] flex justify-center items-center h-[300px]
`;

export default function Input({ type, placeholder }: InputProps) {
  return (
    <InputBox>
      <input type={type} placeholder={placeholder} />
    </InputBox>
  );
}
