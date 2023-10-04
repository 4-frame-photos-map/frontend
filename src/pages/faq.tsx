import tw from 'tailwind-styled-components';
import Header from '@components/common/Header';
import PageLayout from '@components/layout/PageLayout';
import Image from 'next/image';
import FaqModal from '@components/faq/FaqModal';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Seo from '@components/common/Seo';
import { FAQ_LIST } from '@constants/faqLists';

type FaqCategoryProps = {
  id: number;
  value: string;
};

type FaqListProps = {
  id: number;
  title: string;
  content: string;
};

const FAQ_CATEGORY: FaqCategoryProps[] = [
  { id: 1, value: '회원' },
  { id: 2, value: '지점' },
  { id: 3, value: '리뷰' },
  { id: 4, value: '찜' },
  { id: 5, value: '기타' },
];

const Faq = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [faqList, setFaqList] = useState<FaqListProps[]>();
  const [faqInfo, setFaqInfo] = useState<FaqListProps>();

  useEffect(() => {
    const filteredList = FAQ_LIST.filter(
      (faq: FaqListProps) => faq.id === categoryId,
    );
    setFaqList(filteredList);
  }, [categoryId]);

  const handleRadBtn = (id: number) => {
    setCategoryId(id);
  };

  return (
    <PageLayout className="pt-[68px] pb-[58px]">
      <Seo title="문의사항" url="faq" />
      {isModal && faqInfo && (
        <FaqModal
          title={faqInfo.title}
          content={faqInfo.content}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      )}
      <Header isLeft={true} centerTitle="문의사항" />
      <CategoryBar>
        <ItemsWrapper>
          <Swiper
            scrollbar={{ draggable: true }}
            slidesPerView="auto"
            spaceBetween={8}
          >
            {FAQ_CATEGORY.map(({ id, value }) => (
              <SwiperSlide key={id}>
                <li key={id}>
                  <Button
                    className={`${
                      id === categoryId
                        ? 'bg-black text-white shadow-category'
                        : 'bg-white text-black'
                    }`}
                    onClick={() => {
                      handleRadBtn(id);
                    }}
                  >
                    {value}
                  </Button>
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </ItemsWrapper>
      </CategoryBar>
      <section className="mt-[102px] bg-white px-6">
        <ul>
          {faqList?.map((faq) => (
            <FaqItem
              key={faq.title}
              onClick={() => {
                setIsModal(true);
                setFaqInfo(faq);
              }}
            >
              <p>{faq.title}</p>
              <Image src={'/svg/right.svg'} width={20} height={20} alt="보기" />
            </FaqItem>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
};

const CategoryBar = tw.div`
fixed bg-white py-8 max-w-[375px]
`;
const ItemsWrapper = tw.ul`
flex items-center px-6
`;
const Button = tw.button`
rounded-[99px] px-[16px] py-[6px] text-label1 whitespace-nowrap border border-solid border-black
`;
const FaqItem = tw.li`
flex justify-between border-b-[1px] border-bg-primary py-7 last:border-none text-title2 cursor-pointer
`;

export default Faq;
