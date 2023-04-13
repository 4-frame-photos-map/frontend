import NavBar from '@components/navbar/NavBar';
import PageLayout from '@components/layout/PageLayout';
import WishItem from '@components/wish/WishItem';
import { useGetFavorite } from '@hooks/queries/useGetFavorite';
import tw from 'tailwind-styled-components';

const Wish = () => {
  const { data: favorites } = useGetFavorite(127.052068, 37.545704, 'created');
  return (
    <PageLayout>
      <NavBar title={'저장'} isRight={true} isLeft={true} />
      {favorites && favorites.length > 0 ? (
        <WishList>
          {favorites?.map((data, idx) => (
            <WishItem key={idx} {...data} />
          ))}
        </WishList>
      ) : (
        <div className="flex h-[70vh] items-center justify-center">
          <span className="text-title2 text-text-alternative">
            저장한 포토부스가 없습니다.
          </span>
        </div>
      )}
    </PageLayout>
  );
};

const WishList = tw.ul`
flex flex-col gap-y-1 pt-14
`;

export default Wish;
