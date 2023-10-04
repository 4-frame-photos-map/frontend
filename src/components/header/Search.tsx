import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useGetShopsByKeyword } from '@hooks/queries/useGetShop';
import SearchResult from '@components/header/SearchResult';
import SearchList from '@components/header/SearchList';
import { useRecoilValue } from 'recoil';
import { curPosState } from '@recoil/positionAtom';
import useDebounceValue from '@hooks/useDebounceValue';
import { useForm } from 'react-hook-form';

export interface FormValue {
  search: string;
}

type SearchProps = {
  isList: boolean;
  setIsList: Dispatch<SetStateAction<boolean>>;
  setIsMap: Dispatch<SetStateAction<boolean>>;
  isMap: boolean;
  setShopsInfo: Dispatch<SetStateAction<Shop[] | undefined>>;
};

const Search = ({
  isList,
  setIsList,
  isMap,
  setIsMap,
  setShopsInfo,
}: SearchProps) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { register, watch, setValue } = useForm<FormValue>();
  const value = useDebounceValue(watch('search'), 500);
  const curPos = useRecoilValue(curPosState);
  const { data: shops } = useGetShopsByKeyword(value, curPos.lng, curPos.lat);

  useEffect(() => {
    setShopsInfo(shops);
  }, [shops]);

  const handleSearchClick = () => {
    setIsList(true);
  };

  const handleClearValue = () => {
    setValue('search', '');
    setIsList(false);
    setIsMap(false);
  };

  useEffect(() => {
    if (value) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
      setIsList(false);
      setIsMap(false);
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      <SearchForm>
        <SearchInput
          {...register('search')}
          type="text"
          placeholder="지점/장소 검색"
        />
      </SearchForm>
      {watch('search') && (
        <Image
          src="/svg/header/clear-button.svg"
          width={24}
          height={24}
          alt="삭제"
          className="absolute right-7 top-6 z-[999] cursor-pointer"
          onClick={handleClearValue}
        />
      )}
      {isTyping && !isMap && shops && (
        <SearchContainer>
          {shops?.length > 0 && (
            <div
              className="flex cursor-pointer items-center px-4 pt-5"
              onClick={handleSearchClick}
            >
              <Image
                src="/svg/header/search-icon.svg"
                width={28}
                height={28}
                alt="search"
              />
              <span className="pl-4 text-body1 text-status-error">{value}</span>
            </div>
          )}
          {shops?.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-12">
              <Image
                src={'/svg/header/danger.svg'}
                width={40}
                height={40}
                alt="danger"
              />
              <span className="pt-2 text-[18px] text-text-alternative">
                검색 결과가 없습니다.
              </span>
            </div>
          ) : (
            shops?.map((search, idx) => (
              <SearchResult
                key={idx}
                {...search}
                value={value}
                isTyping={isTyping}
              />
            ))
          )}
        </SearchContainer>
      )}
      {isList && !isMap && value && (
        <SearchContainer>
          {shops &&
            shops.map((list, idx) => (
              <SearchList key={idx} {...list} isList={isList} />
            ))}
        </SearchContainer>
      )}
    </div>
  );
};

const SearchInput = tw.input`
bg-bg-primary rounded-[100px] py-[7px] z-[900] w-[300px] pl-4
`;

const SearchForm = tw.form`
ml-4
`;

const SearchContainer = tw.ul`
bg-white absolute top-0 left-0 w-full mt-16 overflow-y-auto h-screen pb-32
`;

export default Search;
