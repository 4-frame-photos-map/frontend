import memberApi from '@apis/member/memberApi';
import Header from '@components/common/Header';
import PageLayout from '@components/layout/PageLayout';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import { usePatchProfile } from '@hooks/mutations/usePatchProfile';
import Seo from '@components/common/Seo';
import useDebounceCallback from '@hooks/useDebounceCallback';

type FormValue = {
  nickname: string;
};

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
    if (value?.length >= 2 && value?.length <= 10 && !errors.nickname) {
      const { status } = await memberApi.getNicknameValidate(value);
      if (status === false || value.length === 0) {
        setIsValidate(false);
      } else {
        setIsValidate(true);
      }
    }
  };
  useDebounceCallback(validateNickname, 300);
  const onSubmit = (form: FormValue) => {
    const { nickname } = form;
    editProfile(nickname);
  };
  return (
    <PageLayout className="bg-white">
      <Seo title="닉네임 변경" url="my/edit" />
      <Header centerTitle="닉네임 변경" isLeft={true} />
      <EditContainer>
        <EditLabel>변경할 닉네임</EditLabel>
        <EditInputBox>
          <EditInput
            placeholder="변경 할 닉네임을 입력해주세요."
            type="text"
            maxLength={10}
            {...register('nickname', {
              required: true,
              minLength: {
                value: 2,
                message: '2 ~ 10자 까지 입력가능합니다.',
              },
              pattern: {
                value: /^[가-힣A-Za-z0-9]{2,10}$/g,
                message: '한글, 영문(대소문자), 숫자만 입력가능합니다.',
              },
            })}
            className={`${
              value ? 'border-text-strong' : 'border-text-assitive'
            } ${
              (errors.nickname?.message ||
                (!isValidate && value?.length > 0)) &&
              'border-status-error'
            }`}
          />
          <EditButton
            disabled={
              (isValidate && !value) || !!errors.nickname || !isValidate
            }
            onClick={handleSubmit(onSubmit)}
          >
            변경하기
          </EditButton>
        </EditInputBox>
        <span className="pt-1 text-caption1 text-status-error">
          {errors.nickname?.message}
          {!isValidate &&
            value?.length > 2 &&
            !errors.nickname?.message &&
            '중복된 닉네임입니다.'}
        </span>
      </EditContainer>
    </PageLayout>
  );
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

export default Edit;
