import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { curPosState } from '@recoil/positionAtom';

type SearchListProps = Shop & {
  isList: boolean;
};

const SearchList = ({
  star_rating_avg,
  review_cnt,
  favorite_cnt,
  place_address,
  place_name,
  distance,
  isList,
  id,
}: SearchListProps) => {
  const router = useRouter();
  const curPos = useRecoilValue(curPosState);
  return isList ? (
    <>
      <DivisionBar />
      <li
        className="cursor-pointer bg-white px-3 py-2"
        onClick={() =>
          router.push(
            `/shopDetail/?shopId=${id}&userLat=${curPos.lat}&userLng=${curPos.lng}`,
          )
        }
      >
        <span className="text-label1">{place_name}</span>
        <div className="flex gap-x-1">
          <Image
            src="/svg/navbar/gray-star.svg"
            width={12}
            height={12}
            alt="star"
          />
          <span className="text-caption1 text-text-alternative">
            {star_rating_avg.toFixed(1)}
            <span className="text-caption1 text-text-alternative">
              {' '}
              ({review_cnt})
            </span>{' '}
            | 찜{' '}
            <span className="text-caption1 text-text-alternative">
              {favorite_cnt}
            </span>
          </span>
        </div>
        <div className="mt-2 flex items-center gap-x-1">
          <span className="text-caption2">{distance}</span>
          <span className="text-caption1 text-text-alternative">
            | {place_address}
          </span>
        </div>
      </li>
    </>
  ) : null;
};

const DivisionBar = tw.div`
flex justify-center h-[1px] w-full bg-line-alternative mx-2 first:mt-5
`;

export default SearchList;
