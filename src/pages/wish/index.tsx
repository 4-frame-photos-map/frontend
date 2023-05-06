import NavBar from '@components/common/NavBar';
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
      <NavBar leftTitle={'찜 목록'} />
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
flex flex-col gap-y-1 py-14
`;

export default Wish;
