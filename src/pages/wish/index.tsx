import NavBar from '@components/common/NavBar';
import PageLayout from '@components/layout/PageLayout';
import WishItem from '@components/wish/WishItem';
import { useGetFavorite } from '@hooks/queries/useGetFavorite';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const Wish = () => {
  const [location, setLocation] = useState<Position>({ lat: 0, lng: 0 });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setLocation({ lat: latitude, lng: longitude });
    });
  }, []);
  const { data: favorites } = useGetFavorite(location.lat, location.lng);
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
flex flex-col gap-y-1 pt-14
`;

export default Wish;
