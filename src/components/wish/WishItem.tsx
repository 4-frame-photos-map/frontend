import BrandTag from '@components/common/BrandTag';
import FavoriteButton from '@components/wish/FavoriteButton';
import Image from 'next/image';
import { useRouter } from 'next/router';

const WishItem = ({ shop }: Favorite) => {
  const router = useRouter();
  return (
    <li className="w-full px-6 py-5 bg-white">
      <BrandTag name={shop.place_name} />
      <div className="flex justify-between pt-1 pb-2">
        <span
          className="cursor-pointer text-body1"
          onClick={() =>
            router.push(
              `/shopDetail/?shopId=${shop.id}&distance=${shop.distance}`,
            )
          }
        >
          {shop.place_name}
        </span>
        <FavoriteButton shopId={shop.id} isWish={true} />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <Image src="/svg/star.svg" width={14} height={14} alt="star" />
          <span className="text-caption1">
            {shop.star_rating_avg.toFixed(1)} <span>({shop.review_cnt})</span> |
            찜<span className="font-semibold"> {shop.favorite_cnt}</span>
          </span>
        </div>
        <span className="text-caption1">{shop.distance}</span>
      </div>
    </li>
  );
};

export default WishItem;
