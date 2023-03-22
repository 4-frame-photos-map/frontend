import tw from 'tailwind-styled-components';

type ModalProps = {
  isModal: boolean;
  title: string;
  message: string;
  left: string;
  right: string;
  leftEvent?: () => void;
  rightEvent?: () => void;
};

const ModalBG = tw.div`
absolute flex h-full w-full items-center justify-center bg-text-alternative p-12
`;

const ModalContainer = tw.div`
flex flex-col bg-white p-5
`;

const ModalTitle = tw.div`
text-label1 font-semibold
`;

const ModalMessage = tw.p`
mt-2 text-[0.75rem] text-text-alternative
`;

const ModalEventContainer = tw.div`
mt-4 flex justify-center gap-1
`;

const ModalEvent = tw.div`
w-full rounded border border-line-normal py-3 px-4 text-center text-label2 cursor-pointer
`;

const Modal = ({
  isModal,
  title,
  message,
  left,
  right,
  leftEvent,
  rightEvent,
}: ModalProps) => {
  return isModal ? (
    <ModalBG>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ModalEventContainer>
          <ModalEvent onClick={leftEvent}>{left}</ModalEvent>
          <ModalEvent onClick={rightEvent}>{right}</ModalEvent>
        </ModalEventContainer>
      </ModalContainer>
    </ModalBG>
  ) : (
    <></>
  );
};

export default Modal;
