import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';
import TextHighlighted from '@components/navbar/TextHighlighted';

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
  const router = useRouter();
  const [initial, ...rest] = place_name.split(value);
  return isTyping ? (
    <li className="px-3 bg-white cursor-pointer first:pt-5">
      <DivisionBar />
      {
        <div
          className="flex items-center"
          onClick={() =>
            router.push(`/shopDetail/?shopId=${id}&distance=${distance}`)
          }
        >
          <div className="flex flex-col items-center">
            <Image
              src="/svg/navbar/location.svg"
              width={20}
              height={20}
              alt="distance"
            />
            <span className="text-caption2 text-line-disable">{distance}</span>
          </div>
          <div className="flex flex-col ml-4">
            <div className="flex">
              <TextHighlighted value={value} initial={initial} rest={rest} />
            </div>
            <span className="text-caption1 text-text-alternative">
              {place_address}
            </span>
          </div>
        </div>
      }
    </li>
  ) : null;
};

const DivisionBar = tw.div`
flex justify-center ml-12 mr-2 h-[1px] w-full bg-line-alternative my-2 
`;

export default SearchResult;
