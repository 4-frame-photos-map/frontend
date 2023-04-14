import Image from 'next/image';
import tw from 'tailwind-styled-components';

type SearchProps = Shop & {
  value: string;
  isTyping: boolean;
};

const SearchResult = ({
  isTyping,
  value,
  place_name,
  distance,
  road_address_name,
  id,
}: SearchProps) => {
  const parts = place_name.split(value);
  return isTyping ? (
    <li className="cursor-pointer bg-white px-3 first:pt-5">
      <DivisionBar />
      {
        <div className="flex items-center">
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
              {parts.map((part, index) => {
                if (index === 0) {
                  return (
                    <span key={index} className="text-label1 text-status-error">
                      {value}
                    </span>
                  );
                } else if (value === place_name.split(' ')[0]) {
                  return (
                    <span key={index} className="text-label1 text-black">
                      <span className="tracking-[-0.3rem]">&nbsp;</span>
                      {part}
                    </span>
                  );
                }
                return (
                  <span key={index} className="text-label1 text-black">
                    {part}
                  </span>
                );
              })}
            </div>
            <span className=" text-caption1 text-text-alternative">
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
