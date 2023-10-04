import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type ModalProps = {
  isModal?: boolean;
  title: string;
  content: string;
  setIsModal: Dispatch<SetStateAction<boolean>>;
};

const FaqModal = ({ isModal, title, content, setIsModal }: ModalProps) => {
  const renderContent = () => {
    const emailRegex = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
    const emailMatch = content.match(emailRegex);
    if (emailMatch) {
      const emailIndex = content.indexOf(emailMatch[0]);
      const emailLength = emailMatch[0].length;
      return (
        <ModalMessage>
          {content.substring(0, emailIndex)}
          <a
            className="cursor-pointer text-blue-500"
            href={`mailto:${emailMatch[0]}`}
          >
            {emailMatch[0]}
          </a>
          {content.substring(emailIndex + emailLength)}
        </ModalMessage>
      );
    }
    return <ModalMessage>{content}</ModalMessage>;
  };

  return isModal ? (
    <ModalBG>
      <div className="mx-4 flex h-[68px] items-center justify-between pt-1">
        <Image
          src={'/svg/header/prev.svg'}
          width={24}
          height={24}
          alt="이전"
          className="z-[900] cursor-pointer"
          onClick={() => {
            setIsModal(false);
          }}
        />
      </div>
      <div className="p-6">
        <ModalTitle>{title}</ModalTitle>
        {renderContent()}
      </div>
    </ModalBG>
  ) : (
    <></>
  );
};

const ModalBG = tw.div`
fixed top-0 w-full max-w-[375px] mx-auto h-full bg-white z-[999]
`;
const ModalTitle = tw.div`
text-headline2 font-medium pb-5 border-b-[1px] border-bg-primary
`;
const ModalMessage = tw.p`
py-7 text-body2 whitespace-pre-line
`;

export default FaqModal;
