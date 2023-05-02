import tw from 'tailwind-styled-components';
import Image from 'next/image';
import BrandTag from '@components/common/BrandTag';
import { useDeleteFavorite } from '@hooks/mutations/useDeleteFavorite';
import { usePostFavorite } from '@hooks/mutations/usePostFavorite';
import { useRouter } from 'next/router';
import { useGetShopDetail } from '@hooks/queries/useGetShop';
import { Dispatch, SetStateAction } from 'react';

type ShopItemProps = {
  brand_name: string;
  file_path: string;
  position: Position;
  id: number;
  place_name: string;
  star_rating: number;
  review_cnt: number;
  isLogin: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
};

const ShopItem = ({
  brand_name,
  file_path,
  position,
  id,
  place_name,
  star_rating,
  review_cnt,
  isLogin,
  setIsModal,
}: ShopItemProps) => {
  const { data: shopInfo } = useGetShopDetail(id, position.lat, position.lng);
  const { mutate: add } = usePostFavorite();
  const { mutate: del } = useDeleteFavorite('/home');
  const router = useRouter();
  const handleFavorite = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    id: number,
  ) => {
    e.stopPropagation();
    if (!isLogin) {
      setIsModal(true);
    } else {
      if (shopInfo?.favorite) {
        del(id);
      } else {
        add(id);
      }
    }
  };
  return (
    <ItemContainer
      onClick={() => {
        router.push(
          `/shopDetail?shopId=${id}&userLat=${position.lat}&userLng=${position.lng}`,
        );
      }}
    >
      <ItemImgContainer>
        <Image
          className="rounded-lg"
          src={`${file_path}`}
          alt={brand_name}
          fill
        />
        <FavoriteBtn>
          {shopInfo?.favorite ? (
            <Image
              src="/svg/wish/filled-bookmark.svg"
              width={24}
              height={24}
              alt="wish"
              onClick={(e) => {
                handleFavorite(e, id);
              }}
            />
          ) : (
            <Image
              src="/svg/wish/lined-bookmark.svg"
              width={24}
              height={24}
              alt="wish"
              className="cursor-pointer"
              onClick={(e) => handleFavorite(e, id)}
            />
          )}
        </FavoriteBtn>
      </ItemImgContainer>
      <span className="truncate text-label1">{place_name}</span>
      <ItemDescBox>
        <span className="flex pr-2">
          <Image src="/svg/star.svg" width={16} height={16} alt="star" />
          {star_rating} ({review_cnt})
        </span>
        <div className="border-l pl-2">
          <span className="pr-1">찜</span>
          <span className="font-semibold">{shopInfo?.favorite_cnt}</span>
        </div>
      </ItemDescBox>
      <span className="mb-2 text-caption1 text-text-alternative">
        {shopInfo?.distance}
      </span>
      <BrandTag name={brand_name} />
    </ItemContainer>
  );
};

const ItemContainer = tw.div`
flex flex-col cursor-pointer relative
`;
const FavoriteBtn = tw.div`
absolute top-2 right-2
`;
const ItemImgContainer = tw.div`
mb-3 h-[160px] w-full rounded-lg relative
`;
const ItemDescBox = tw.div`
mt-2 flex text-caption1
`;

export default ShopItem;
