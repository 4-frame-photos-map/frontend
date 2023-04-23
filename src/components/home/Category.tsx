import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from '@styles/swiper.module.css';

type CategoriesProps = {
  id: number;
  name: string;
  state: string;
};

type CategoryData = {
  setBrd: Dispatch<SetStateAction<string>>;
};

const Categories: CategoriesProps[] = [
  { id: 1, name: '전체', state: '' },
  { id: 2, name: '인생네컷', state: '인생네컷' },
  { id: 3, name: '하루필름', state: '하루필름' },
  { id: 4, name: '포토이즘', state: '포토이즘' },
  { id: 5, name: '포토그레이', state: '포토그레이' },
];

const Category = ({ setBrd }: CategoryData) => {
  const [categoryId, setCategoryId] = useState<number>(1);
  const [swiper, setSwiper] = useState<any>(null);

  const handleCatBtn = (id: number, state: string) => {
    setCategoryId(id);
    setBrd(state);
    swiper.slideTo(id - 3);
  };

  const handleSwiper = (swiper: any) => {
    setSwiper(swiper);
    swiper.slideTo(categoryId - 3);
  };

  return (
    <CategoryBar>
      <ItemsWrapper>
        <Swiper
          scrollbar={{ draggable: true }}
          slidesPerView={4}
          spaceBetween={16}
          onSwiper={handleSwiper}
        >
          {Categories.map(({ id, name, state }) => (
            <SwiperSlide key={id}>
              <Item key={id}>
                <Button
                  className={`${
                    id === categoryId
                      ? 'bg-black text-white shadow-category'
                      : 'border border-solid border-black bg-white text-black'
                  }`}
                  onClick={() => handleCatBtn(id, state)}
                >
                  {name}
                </Button>
              </Item>
            </SwiperSlide>
          ))}
        </Swiper>
      </ItemsWrapper>
    </CategoryBar>
  );
};

const CategoryBar = tw.div`
mt-[68px] overflow-x-hidden fixed max-w-[375px] relative
`;

const ItemsWrapper = tw.ul`
flex items-center pl-[16px] my-[8px] 
`;

const Item = tw.li`
flex 
`;

const Button = tw.button`
rounded-[99px] px-[16px] py-[6px] text-label1 whitespace-nowrap
`;

export default Category;
