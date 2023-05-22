import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useGetShopsByKeyword } from '@hooks/queries/useGetShop';
import SearchResult from '@components/navbar/SearchResult';
import SearchList from '@components/navbar/SearchList';
import { useRecoilValue } from 'recoil';
import { curPosState } from '@recoil/positionAtom';

export interface FormValue {
  search: string;
}

type SearchProps = {
  isList: boolean;
  setIsList: Dispatch<SetStateAction<boolean>>;
  setIsMap: Dispatch<SetStateAction<boolean>>;
  isMap: boolean;
  location: Position;
  setShopsInfo: Dispatch<SetStateAction<Shop[] | undefined>>;
};

const Search = ({
  isList,
  setIsList,
  isMap,
  setIsMap,
  location,
  setShopsInfo,
}: SearchProps) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { register, watch, setValue, handleSubmit } = useForm<FormValue>({
    mode: 'onChange',
  });
  const value = watch('search');
  const curPos = useRecoilValue(curPosState);

  const { data: shops } = useGetShopsByKeyword(value, curPos.lng, curPos.lat);

  useEffect(() => {
    setShopsInfo(shops);
  }, [shops]);

  const onSubmit = (data: FormValue) => {
    setValue('search', data.search);
  };

  let timer: NodeJS.Timeout;

  const handleSearchChange = (inputValue: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setValue('search', inputValue);
    }, 500);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    handleSearchChange(inputValue);
  };

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
      <SearchForm onSubmit={handleSubmit(onSubmit)}>
        <SearchInput
          {...register('search')}
          type="text"
          placeholder="지점/장소 검색"
          onChange={handleInputChange}
        />
      </SearchForm>
      {watch('search') && (
        <Image
          src="/svg/navbar/clear-button.svg"
          width={24}
          height={24}
          alt="삭제"
          className="absolute right-7 top-6 z-[999] cursor-pointer"
          onClick={handleClearValue}
        />
      )}
      {isTyping && !isMap && (
        <SearchContainer>
          <div
            className="flex items-center px-4 pt-5 cursor-pointer"
            onClick={handleSearchClick}
          >
            <Image
              src="/svg/navbar/search-icon.svg"
              width={28}
              height={28}
              alt="search"
            />
            <span className="pl-4 text-body1 text-status-error">{value}</span>
          </div>
          {shops?.length === 0 ? (
            <div className="flex h-[60vh] flex-col items-center justify-center">
              <span className="mr-2 text-body1 text-status-error">
                {"' " + value + " '"}
              </span>
              <span className="text-title2 text-text-alternative">
                에 대한 검색 결과가 없습니다.
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
          {shops?.length === 0 && (
            <div className="flex h-[60vh] flex-col items-center justify-center">
              <span className="mr-2 text-body1 text-status-error">
                {"' " + value + " '"}
              </span>
              <span className="text-title2 text-text-alternative">
                에 대한 검색 결과가 없습니다.
              </span>
            </div>
          )}
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
