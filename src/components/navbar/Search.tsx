import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useGetShopsByKeyword } from '@hooks/queries/useGetShop';
import SearchResult from '@components/navbar/SearchResult';
import SearchList from '@components/navbar/SearchList';

export interface FormValue {
  search: string;
}

type SearchProps = {
  isList: boolean;
  setIsList: Dispatch<SetStateAction<boolean>>;
  setIsMap: Dispatch<SetStateAction<boolean>>;
  isMap: boolean;
};

const Search = ({ isList, setIsList, isMap, setIsMap }: SearchProps) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const { register, watch, setValue, handleSubmit } = useForm<FormValue>({
    mode: 'onChange',
  });
  const value = watch('search');
  const { data: shops } = useGetShopsByKeyword(value, 127.052068, 37.545704);

  const onSubmit = (data: FormValue) => {
    if (!isMap) {
      setIsList(true);
    }
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
          className="relative"
        />
      </SearchForm>
      {watch('search') && (
        <Image
          src="/svg/navbar/clear-button.svg"
          width={24}
          height={24}
          alt="삭제"
          className="absolute right-8 top-6 z-[999] cursor-pointer"
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
            <span className="pl-3 text-body1 text-status-error">{value}</span>
          </div>
          {shops?.map((search, idx) => (
            <SearchResult
              key={idx}
              {...search}
              value={value}
              isTyping={isTyping}
            />
          ))}
        </SearchContainer>
      )}
      {isList && !isMap && (
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
bg-bg-primary rounded-[100px] pl-4 pr-24 py-[7px] z-[900] mr-[9px] relative
`;

const SearchForm = tw.form`
basis-5/6
`;

const SearchContainer = tw.ul`
bg-white absolute top-0 left-0 w-full mt-16 overflow-y-auto h-screen pb-32
`;

export default Search;
