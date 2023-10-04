import Image from 'next/image';
import tw from 'tailwind-styled-components';
import Link from 'next/link';

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
  return isList ? (
    <>
      <ResultItem>
        <Link href={`/shopDetail/?shopId=${id}`}>
          <span className="text-label1">{place_name}</span>
          <div className="flex gap-x-1">
            <Image
              src="/svg/header/gray-star.svg"
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
        </Link>
      </ResultItem>
    </>
  ) : null;
};

const ResultItem = tw.li`
cursor-pointer border-t-[1px] border-line-alternative bg-white px-3 py-2 first:mt-5
`;

export default SearchList;
