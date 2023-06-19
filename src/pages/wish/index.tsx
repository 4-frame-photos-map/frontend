import NavBar from '@components/common/NavBar';
import Seo from '@components/common/Seo';
import PageLayout from '@components/layout/PageLayout';
import WishItem from '@components/wish/WishItem';
import { useGetFavorite } from '@hooks/queries/useGetFavorite';
import { curPosState } from '@recoil/positionAtom';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';

const Wish = () => {
  const curPos = useRecoilValue(curPosState);
  const { data: favorites } = useGetFavorite(curPos.lat, curPos.lng);
  return (
    <PageLayout>
      <Seo title="찜" url="wish" />
      <NavBar
        isWish={true}
        leftTitle={'찜 목록'}
        favoritesNum={favorites?.length}
      />
      {favorites && favorites.length > 0 ? (
        <WishList>
          {favorites?.map(({ id, shop }) => (
            <WishItem key={id} {...shop} />
          ))}
        </WishList>
      ) : (
        <div className="flex h-[100vh] items-center justify-center">
          <span className="text-title2 text-text-alternative">
            저장한 포토부스가 없습니다.
          </span>
        </div>
      )}
    </PageLayout>
  );
};

const WishList = tw.ul`
flex flex-col gap-y-1 py-14
`;

export default Wish;
