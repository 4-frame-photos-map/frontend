import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';

type FormValue = {
  nickname: string;
};

const EditContainer = tw.div`
mt-12 flex flex-col px-4
`;

const EditLabel = tw.label`
text-[0.938rem] text-text-assitive
`;

const EditInputBox = tw.div`
grid grid-cols-4 gap-1
`;

const EditInput = tw.input`
col-span-3 h-[42px] rounded border border-[#CCCCCC] pl-1 text-label2
`;

const EditButton = tw.div`
flex cursor-pointer items-center justify-center rounded bg-[#67C8FF] text-[0.875rem] text-white
`;

const Edit = () => {
  const { register, handleSubmit } = useForm<FormValue>();
  const onSubmit = () => {
    console.log('form 전송');
  };
  return (
    <PageLayout className="bg-white">
      <NavBar title="닉네임 변경" isLeft={true} />
      <EditContainer>
        <EditLabel>변경할 닉네임</EditLabel>
        <EditInputBox>
          <EditInput {...register('nickname')} type="text" />
          <EditButton onClick={handleSubmit(onSubmit)}>변경하기</EditButton>
        </EditInputBox>
      </EditContainer>
    </PageLayout>
  );
};

export default Edit;
