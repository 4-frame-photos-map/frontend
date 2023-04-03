import BrandTag from '@components/common/BrandTag';
import Image from 'next/image';

const WishItem = ({ shop }: Favorite) => {
  return (
    <li className="w-full bg-white px-[24px] py-5">
      <div className="flex justify-between pb-3">
        {shop.place_name}
        <Image
          src="/svg/wish/filled-bookmark.svg"
          width={24}
          height={24}
          alt="bookmark"
          className="cursor-pointer"
        />
      </div>
      <BrandTag name={shop.place_name} />
    </li>
  );
};

export default WishItem;
