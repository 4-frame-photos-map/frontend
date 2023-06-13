import Image from 'next/image';

type ShopTitleProps = {
  title: string;
  width: number;
  height: number;
};

export type titleListType = {
  [key: string]: JSX.Element;
};

const ShopTitle = ({ title, width, height }: ShopTitleProps) => {
  const shopTitleList: titleListType = {
    핫플레이스: (
      <Image
        src={'/svg/shop-title-hot-place.svg'}
        width={width}
        height={height}
        alt="hot-place"
      />
    ),
    '청결한 지점': (
      <Image
        src={'/svg/shop-title-clean.svg'}
        width={width}
        height={height}
        alt="hot-place"
      />
    ),
  };
  return <>{shopTitleList[title]}</>;
};

export default ShopTitle;
