import NavBar from '@components/common/NavBar';
import PageLayout from '@components/common/PageLayout';
import WishItem from '@components/wish/WishItem';
import tw from 'tailwind-styled-components';

type ArrayProps = {
  id: number;
  shop: {
    id: number;
    place_name: string;
    road_address_name: string;
  };
};

const wishArray: ArrayProps[] = [
  {
    id: 1,
    shop: {
      id: 3040,
      place_name: '하루필름 서울대점',
      road_address_name: '서울 용산구 이태원로26길 16',
    },
  },
  {
    id: 2,
    shop: {
      id: 3042,
      place_name: '인생네컷 서울 경리단점',
      road_address_name: '서울 용산구 이태원로26길 16',
    },
  },
  {
    id: 3,
    shop: {
      id: 3042,
      place_name: '포토이즘 노원점',
      road_address_name: '서울 용산구 이태원로26길 16',
    },
  },
];

const Wish = () => {
  return (
    <PageLayout>
      <NavBar title={'저장'} isRight={true} isLeft={true} />
      {wishArray.length > 0 ? (
        <WishList>
          {wishArray.map((data, idx) => (
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
flex flex-col gap-y-1 pt-[64px]
`;

export default Wish;
