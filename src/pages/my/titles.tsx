import Header from '@components/common/Header';
import Seo from '@components/common/Seo';
import PageLayout from '@components/layout/PageLayout';
import TitleInfo from '@components/title/TitleInfo';
import TitleModal from '@components/title/TitleModal';
import { useGetAllTitles } from '@hooks/queries/useGetMemberTitle';
import Image from 'next/image';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

export type ModalTitleType = {
  id: number | null;
  image_url: string | null;
  name: string | null;
  is_holding: boolean;
  is_main: boolean;
  content: string | null;
  standard: string | null;
};

const Titles = () => {
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<ModalTitleType>({
    id: null,
    image_url: null,
    name: null,
    is_holding: false,
    is_main: false,
    content: null,
    standard: null,
  });
  const { data: titles } = useGetAllTitles();

  const handleTitleClick = (
    id: number,
    image_url: string,
    name: string,
    is_holding: boolean,
    is_main: boolean,
    content: string,
    standard: string,
  ) => {
    setIsModal(true);
    setModalTitle({
      id,
      image_url,
      name,
      is_holding,
      is_main,
      content,
      standard,
    });
  };

  return (
    <PageLayout className="bg-white">
      <Seo title="내 칭호" url="my/titles" />
      <Header centerTitle="내 칭호" isLeft={true} setIsInfo={setIsInfo} />
      {isInfo && <TitleInfo />}
      {isModal && <TitleModal setIsModal={setIsModal} title={modalTitle} />}
      <TitleContainer>
        <MainTitle>
          {titles?.main_member_title.image_url && (
            <Image
              src={titles.main_member_title.image_url as string}
              width={120}
              height={120}
              alt="대표 칭호"
            />
          )}
          <TitleName>{titles?.main_member_title.name}</TitleName>
        </MainTitle>
        <span className="mx-4 my-10 h-[1px] w-[327px] bg-bg-primary" />
        <AllTitles>
          {titles?.member_titles.map(
            ({
              id,
              image_url,
              name,
              is_holding,
              is_main,
              content,
              standard,
            }) => (
              <div key={id} className="flex flex-col items-center">
                {is_holding ? (
                  is_main ? (
                    <TitleBox
                      className="border-[2px] border-[#FF5A5A]"
                      onClick={() =>
                        handleTitleClick(
                          id,
                          image_url,
                          name,
                          is_holding,
                          is_main,
                          content,
                          standard,
                        )
                      }
                    >
                      <Image
                        src={image_url}
                        width={80}
                        height={80}
                        alt="칭호"
                      />
                    </TitleBox>
                  ) : (
                    <TitleBox
                      onClick={() =>
                        handleTitleClick(
                          id,
                          image_url,
                          name,
                          is_holding,
                          is_main,
                          content,
                          standard,
                        )
                      }
                    >
                      <Image
                        src={image_url}
                        width={80}
                        height={80}
                        alt="칭호"
                      />
                    </TitleBox>
                  )
                ) : (
                  <TitleBox
                    className="border-line-disable"
                    onClick={() =>
                      handleTitleClick(
                        id,
                        image_url,
                        name,
                        is_holding,
                        is_main,
                        content,
                        standard,
                      )
                    }
                  >
                    <Image src={image_url} width={80} height={80} alt="칭호" />
                  </TitleBox>
                )}
                <TitleName className="mt-4 text-label2">{name}</TitleName>
              </div>
            ),
          )}
        </AllTitles>
      </TitleContainer>
    </PageLayout>
  );
};

export default Titles;

const TitleContainer = tw.div`
flex justify-center mt-[68px] flex-col mb-[72px]
`;

const MainTitle = tw.div`
flex flex-col items-center pt-5
`;

const TitleName = tw.span`
mt-4 text-label1 font-semibold
`;

const AllTitles = tw.div`
grid grid-cols-3 place-items-center gap-y-10
`;

const TitleBox = tw.div`
w-[100px] h-[100px] border-[1px] border-primary-normal flex justify-center items-center shadow-[2px_2px_10px_0_rgba(0, 0, 0, 0.1)] rounded-[20px] cursor-pointer
`;
