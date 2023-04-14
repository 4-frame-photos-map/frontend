import tw from 'tailwind-styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { CONFIG } from '@config';
import { ReactNode } from 'react';

type ModalProps = {
  isModal: boolean;
  isKakao?: boolean;
  title: string;
  message: string | ReactNode;
  left: string;
  right?: string;
  leftEvent?: () => void;
  rightEvent?: () => void;
};

const ModalBG = tw.div`
fixed top-0 w-full max-w-[375px] mx-auto flex h-full items-center justify-center bg-text-alternative p-6 z-[999]
`;

const ModalContainer = tw.div`
flex flex-col bg-white rounded-lg flex-wrap w-full
`;

const ModalTitle = tw.div`
text-title1 font-semibold text-center
`;

const ModalMessage = tw.p`
mt-4 text-[0.875rem] text-text-alternative text-center
`;

const ModalEventContainer = tw.div`
flex text-white
`;

const ModalEvent = tw.div`
py-4 px-8 text-center text-body1 cursor-pointer flex items-center justify-center h-[58px]
`;

const KakaoButton = tw.div`
py-4 px-6 rounded-br-lg bg-[#F9E000] leading-3 basis-2/3 text-center flex justify-center
`;

const Modal = ({
  isModal = false,
  isKakao = false,
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
        <div className="p-6">
          <ModalTitle>{title}</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
        </div>
        <ModalEventContainer>
          <ModalEvent
            className={`rounded-bl-lg bg-[#DDDEE3] ${
              isKakao ? 'basis-2/5' : 'basis-1/2'
            }`}
            onClick={leftEvent}
          >
            {left}
          </ModalEvent>
          {!isKakao ? (
            <ModalEvent
              className="basis-1/2 rounded-br-lg bg-[#333333]"
              onClick={rightEvent}
            >
              {right}
            </ModalEvent>
          ) : (
            <KakaoButton>
              <Link
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${CONFIG.API_KEYS.LOGIN}&redirect_uri=${CONFIG.LOCAL}/auth/kakao&response_type=code`}
                className="flex items-center"
              >
                <Image
                  src="/svg/kakao.svg"
                  width={20}
                  height={20}
                  alt="kakao"
                  priority
                />
                <span className="ml-2 font-normal text-black text-body1">
                  카카오 로그인
                </span>
              </Link>
            </KakaoButton>
          )}
        </ModalEventContainer>
      </ModalContainer>
    </ModalBG>
  ) : (
    <></>
  );
};

export default Modal;
