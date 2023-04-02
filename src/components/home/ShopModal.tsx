import BrandTag from '@components/common/BrandTag';
import Image from 'next/image';
import { ModalProps } from 'pages/home';

const ShopModal = ({
  id,
  place_name,
  distance,
  place_url,
  star_rating_avg,
  review_cnt,
  favorite,
}: ModalProps) => {
  return (
    <div className="mx-6 h-[98px] rounded-[8px] bg-bg-secondary shadow-shopModal">
      <div className="p-4">
        <BrandTag
          name={place_name}
          className={`${place_name.includes('인생네컷') && 'bg-brand-purple'} ${
            place_name.includes('하루필름') && 'bg-brand-yellow'
          } ${place_name.includes('포토이즘') && 'bg-brand-green'}`}
        />
        <div className="flex justify-between pt-1 pb-2">
          <span className="text-label1">{place_name}</span>
          {favorite ? (
            <Image
              src="/svg/wish/filled-bookmark.svg"
              width={24}
              height={24}
              alt="wish"
            />
          ) : (
            <Image
              src="/svg/wish/lined-bookmark.svg"
              width={24}
              height={24}
              alt="wish"
              className="cursor-pointer"
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image src="/svg/star.svg" width={16} height={16} alt="star" />
            <span className="text-caption1">
              {star_rating_avg}({review_cnt})
            </span>
          </div>
          <span className="text-caption1">{distance}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
