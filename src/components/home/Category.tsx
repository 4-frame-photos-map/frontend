import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

type CategoriesProps = {
  id: number;
  name: string;
};

const Categories: CategoriesProps[] = [
  { id: 1, name: '전체' },
  { id: 2, name: '인생네컷' },
  { id: 3, name: '하루필름' },
  { id: 4, name: '포토이즘' },
  { id: 5, name: '탭명' },
];

const Category = () => {
  const [categoryId, setCategoryId] = useState<number>(1);
  const handleCatBtn = (id: number) => {
    setCategoryId(id);
  };
  return (
    <CategoryBar>
      <ItemsWrapper>
        {Categories.map(({ id, name }) => (
          <Item key={id}>
            <Button
              className={`${
                id === categoryId
                  ? 'bg-black text-white shadow-category'
                  : 'border border-solid border-black bg-white text-black'
              }`}
              onClick={() => handleCatBtn(id)}
            >
              {name}
            </Button>
          </Item>
        ))}
      </ItemsWrapper>
    </CategoryBar>
  );
};

const CategoryBar = tw.div`
pt-[67px] overflow-x-hidden
`;

const ItemsWrapper = tw.ul`
flex items-center pl-[16px] my-[8px] gap-x-[7px]
`;

const Item = tw.li`
flex 
`;

const Button = tw.button`
rounded-[99px] px-[16px] py-[6px] text-label1 whitespace-nowrap
`;

export default Category;
