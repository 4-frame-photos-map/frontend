import Image from 'next/image';
import tw from 'tailwind-styled-components';
import TextHighlighted from '@components/header/TextHighlighted';
import Link from 'next/link';

type SearchProps = Shop & {
  value: string;
  isTyping: boolean;
};

const SearchResult = ({
  isTyping,
  value,
  id,
  place_name,
  distance,
  place_address,
}: SearchProps) => {
  const [initial, ...rest] = place_name.split(value);
  return isTyping ? (
    <li className="cursor-pointer bg-white px-3 first:pt-5">
      <DivisionBar />
      {
        <Link href={`/shopDetail/?shopId=${id}`}>
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <Image
                src="/svg/header/location.svg"
                width={20}
                height={20}
                alt="distance"
              />
              <span className="text-caption2 text-line-disable">
                {distance}
              </span>
            </div>
            <div className="ml-4 flex flex-col">
              <div className="flex">
                <TextHighlighted value={value} initial={initial} rest={rest} />
              </div>
              <span className="text-caption1 text-text-alternative">
                {place_address}
              </span>
            </div>
          </div>
        </Link>
      }
    </li>
  ) : null;
};

const DivisionBar = tw.div`
flex justify-center ml-12 mr-2 h-[1px] w-full bg-line-alternative my-2 
`;

export default SearchResult;
