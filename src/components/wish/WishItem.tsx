import BrandTag from '@components/common/BrandTag';
import Image from 'next/image';

const WishItem = ({ id, shop }: Favorite) => {
  return (
    <li className="w-full bg-white px-[24px] py-5">
      <BrandTag
        name={shop.place_name}
        className={`${
          shop.place_name.includes('인생네컷') && 'bg-brand-purple'
        } ${shop.place_name.includes('하루필름') && 'bg-brand-yellow'} ${
          shop.place_name.includes('포토이즘') && 'bg-brand-green'
        }`}
      />
      <div className="flex justify-between pt-1">
        {shop.place_name}
        <Image
          src="/svg/wish/filled-bookmark.svg"
          width={24}
          height={24}
          alt="bookmark"
          className="cursor-pointer"
        />
      </div>
    </li>
  );
};

export default WishItem;
