import Image from 'next/image';
import DivisionBar from '@components/common/DivisionBar';

type SearchListProps = Shop & {
  isList: boolean;
};

const SearchList = ({
  star_rating_avg,
  review_cnt,
  favorite_cnt,
  road_address_name,
  place_name,
  distance,
  isList,
}: SearchListProps) => {
  return isList ? (
    <>
      <DivisionBar className="mx-0 first:mt-5" />
      <li className="px-3 py-2 bg-white cursor-pointer">
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
        <div className="flex items-center mt-2 gap-x-1">
          <span className="text-caption2">{distance}</span>
          <span className="text-caption1 text-text-alternative">
            | {road_address_name}
          </span>
        </div>
      </li>
    </>
  ) : null;
};

export default SearchList;
