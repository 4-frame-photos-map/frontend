import memberApi from '@apis/member/memberApi';
import NavBar from '@components/navbar/NavBar';
import PageLayout from '@components/layout/PageLayout';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import useDebounce from '@hooks/useDebounce';
import { usePatchProfile } from '@hooks/mutations/usePatchProfile';

type FormValue = {
  nickname: string;
};

const EditContainer = tw.div`
flex flex-col px-4 mt-[62px] pt-12
`;

const EditLabel = tw.label`
text-body1 mb-1 font-semibold
`;

const EditInputBox = tw.div`
grid grid-cols-4 gap-1
`;

const EditInput = tw.input`
col-span-3 h-[42px] rounded border pl-1 text-label2 focus:outline-0
`;

const EditButton = tw.button`
${({ disabled }) => (disabled ? 'bg-primary-disable' : 'bg-primary-normal')}
flex cursor-pointer items-center justify-center rounded text-[0.875rem] text-white
`;

const Edit = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onChange' });
  const [isValidate, setIsValidate] = useState<boolean>(true);
  const { mutate: editProfile } = usePatchProfile();
  const value = watch('nickname');
  const validateNickname = async () => {
    if (value?.length >= 2 && value?.length <= 10 && !!!errors.nickname) {
      const { status } = await memberApi.getNicknameValidate(value);
      if (status || value.length === 0) {
        setIsValidate(false);
      } else {
        setIsValidate(true);
      }
    }
  };
  useDebounce(validateNickname, 300);
  const onSubmit = (form: FormValue) => {
    const { nickname } = form;
    editProfile(nickname);
  };
  return (
    <PageLayout className="bg-white">
      <NavBar title="닉네임 변경" isLeft={true} />
      <EditContainer>
        <EditLabel>변경할 닉네임</EditLabel>
        <EditInputBox>
          <EditInput
            placeholder="변경 할 닉네임을 입력해주세요."
            {...register('nickname', {
              required: true,
              pattern: {
                value: /^[가-힣A-Za-z0-9]{2,10}$/g,
                message: '최소 2자 ~ 최대 10자 까지 입력 가능합니다.',
              },
            })}
            maxLength={10}
            type="text"
            className={value ? 'border-text-strong' : 'border-text-assitive'}
          />
          <EditButton
            disabled={isValidate || !!errors.nickname}
            onClick={handleSubmit(onSubmit)}
          >
            변경하기
          </EditButton>
        </EditInputBox>
      </EditContainer>
    </PageLayout>
  );
};

export default Edit;
