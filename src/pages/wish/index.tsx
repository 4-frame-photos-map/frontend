import MetaHead from '@components/common/MetaHead';
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
      <MetaHead
        title={'찜 목록 | 네컷 지도'}
        description={
          '네컷 지도의 찜한 포토 부스를 모아볼 수 있는 페이지입니다.'
        }
      />
      <NavBar leftTitle={'찜 목록'} />
      {favorites && favorites.length > 0 ? (
        <WishList>
          {favorites?.map((data, idx) => (
            <WishItem key={idx} {...data} />
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
