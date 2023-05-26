import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type RadiusValueProps = {
  id: number;
  value: number;
  text: string;
};

type RadiusModalProps = {
  radius: number;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  setRadius: Dispatch<SetStateAction<number>>;
};

const RADIUS_VALUES: RadiusValueProps[] = [
  { id: 1, value: 500, text: '500m' },
  { id: 2, value: 1000, text: '1km' },
  { id: 3, value: 2000, text: '2km' },
  { id: 4, value: 4000, text: '4km' },
  { id: 5, value: 6000, text: '6km' },
];

const RadiusModal = ({ radius, setIsModal, setRadius }: RadiusModalProps) => {
  const [categoryId, setCategoryId] = useState<number>(radius);

  const handleRadBtn = (id: number, value: number) => {
    setCategoryId(value);
    setRadius(value);
  };
  return (
    <ModalBG>
      <ModalContainer>
        <div className="mb-1 flex justify-between text-body1 font-semibold">
          <p>반경 설정</p>
          <Image
            src="/svg/close.svg"
            width={24}
            height={24}
            alt="닫기"
            onClick={() => {
              setIsModal(false);
            }}
            className="cursor-pointer"
          />
        </div>
        <p className="text-label2 text-text-alternative">
          해당 반경 내 장소를 추천해드립니다.
        </p>
        <ul className="my-6">
          <Swiper
            scrollbar={{ draggable: true }}
            slidesPerView="auto"
            spaceBetween={4}
          >
            {RADIUS_VALUES.map(({ id, value, text }) => (
              <SwiperSlide className="flex justify-center text-center" key={id}>
                <li key={id}>
                  <Button
                    className={`${
                      value === categoryId
                        ? 'bg-black text-white shadow-category'
                        : 'bg-white text-black'
                    }`}
                    onClick={() => {
                      handleRadBtn(id, value);
                      setIsModal(false);
                    }}
                  >
                    {text}
                  </Button>
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </ModalContainer>
    </ModalBG>
  );
};

const ModalBG = tw.div`
fixed w-full max-w-[375px] mx-auto flex h-full justify-center bg-[rgba(51,51,53,0.6)] p-6 z-[998]
`;
const ModalContainer = tw.div`
absolute bottom-0 w-full h-[200px] pt-8 px-6 bg-white rounded-t-[30px] z-[999]
`;
const Button = tw.button`
rounded-[99px] px-[16px] py-[6px] text-label1 whitespace-nowrap border border-solid border-black
`;
export default RadiusModal;
