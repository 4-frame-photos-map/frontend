import { usePatchTitle } from '@hooks/mutations/usePatchTitle';
import Image from 'next/image';
import { ModalTitleType } from 'pages/my/titles';
import { Dispatch, SetStateAction } from 'react';
import tw from 'tailwind-styled-components';

type TitleModalProps = {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  title: ModalTitleType;
};

const TitleModal = ({ setIsModal, title }: TitleModalProps) => {
  const { id, image_url, name, is_holding, is_main, content, standard } = title;
  const { mutate } = usePatchTitle(
    id as number,
    image_url as string,
    name as string,
    is_main,
  );

  const handleOverlayClick = () => {
    setIsModal(false);
  };

  const handleButtonClick = (id: number) => {
    mutate(id);
  };
  return (
    <ModalBG>
      <ModalContainer>
        <Image
          src="/svg/close.svg"
          width={24}
          height={24}
          alt="닫기"
          className="absolute right-5 cursor-pointer"
          onClick={handleOverlayClick}
        />
        <Image src={image_url as string} width={120} height={120} alt="칭호" />
        <span className="mt-4 text-label1 font-semibold">{name}</span>
        {is_holding ? (
          <span className="mt-2 text-label2">{content}</span>
        ) : (
          <span className="mt-2 flex text-center text-label2">
            획득방법:
            <br />
            {standard}
          </span>
        )}

        {is_holding ? (
          <ActiveButton
            onClick={() => {
              handleButtonClick(id as number);
              setIsModal(false);
            }}
          >
            <span className="text-center text-[18px]">
              나의 대표 칭호로 사용하기
            </span>
            <Image
              src="/svg/check.svg"
              width={13}
              height={13}
              alt="체크"
              className="ml-1"
            />
          </ActiveButton>
        ) : (
          <DisabledButton>
            <span className="text-center text-[18px]">
              나의 대표 칭호로 사용하기
            </span>
            <Image
              src="/svg/disabled_check.svg"
              width={20}
              height={20}
              alt="체크"
              className="ml-1"
            />
          </DisabledButton>
        )}
      </ModalContainer>
    </ModalBG>
  );
};

const ModalBG = tw.div`
fixed w-full max-w-[375px] mx-auto flex h-full justify-center bg-[rgba(51,51,53,0.6)] p-6 z-[998]
`;

const ModalContainer = tw.div`
flex flex-col items-center bg-white w-full h-[338px] bottom-0 absolute rounded-t-[30px] pt-8 z-[999]
`;

const ActiveButton = tw.button`
mt-8 flex h-12 w-[255px] items-center justify-center whitespace-nowrap rounded-full border-[1px] border-primary-normal
`;

const DisabledButton = tw.button`
mt-8 flex h-12 w-[255px] items-center justify-center whitespace-nowrap rounded-full border-[1px] border-text-disable text-text-disable
`;

export default TitleModal;
