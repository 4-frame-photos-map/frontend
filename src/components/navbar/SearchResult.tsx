import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

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
  road_address_name,
}: SearchProps) => {
  const router = useRouter();
  const parts = place_name.split(value);
  return isTyping ? (
    <li className="cursor-pointer bg-white px-3 first:pt-5">
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
          <div className="ml-4 flex flex-col">
            <div className="flex">
              {parts.length > 1 ? (
                parts[0] !== parts[0]?.trim() ? (
                  <>
                    <span className="text-label1 text-black">{parts[0]}</span>
                    <span className="text-label1 text-status-error">
                      &nbsp;{value}
                    </span>
                    <span className="text-label1 text-black">{parts[1]}</span>
                  </>
                ) : (
                  <>
                    <span className="text-label1 text-black">{parts[0]}</span>
                    <span className="text-label1 text-status-error">
                      {value}
                    </span>
                    <span className="text-label1 text-black">{parts[1]}</span>
                  </>
                )
              ) : (
                place_name
              )}
            </div>
            <span className="text-caption1 text-text-alternative">
              {road_address_name}
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
