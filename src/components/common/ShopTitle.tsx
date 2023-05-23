import Image from 'next/image';

type ShopTitleProps = {
  title: string;
};

type titleListType = {
  [key: string]: JSX.Element;
};

const TITLE_LIST: titleListType = {
  핫플레이스: (
    <Image
      src={'/svg/shop-title-hot-place.svg'}
      width={70}
      height={20}
      alt="hot-place"
    />
  ),
  '청결한 지점': (
    <Image
      src={'/svg/shop-title-clean.svg'}
      width={70}
      height={20}
      alt="hot-place"
    />
  ),
};

const ShopTitle = ({ title }: ShopTitleProps) => {
  return <>{title && TITLE_LIST[title]}</>;
};

export default ShopTitle;
