import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useDeleteFavorite } from '@hooks/mutations/useDeleteFavorite';
import { usePostFavorite } from '@hooks/mutations/usePostFavorite';
import { useRouter } from 'next/router';
import { useGetShopDetail } from '@hooks/queries/useGetShop';
import { SetterOrUpdater } from 'recoil';
import ShopTitle from '@components/title/ShopTitle';
import useToast from '@hooks/useToast';

type ShopItemProps = {
  brand_name: string;
  file_path: string;
  position: Position;
  id: number;
  place_name: string;
  star_rating: number;
  review_cnt: number;
  isLogin: boolean;
  setIsModal: SetterOrUpdater<boolean>;
  shop_titles?: string[];
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
  const { showToast } = useToast();
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
        showToast({
          message: '찜을 삭제했어요.',
          duration: 800,
        });
      } else {
        add(id);
        showToast({
          message: '찜을 추가했어요.',
          duration: 800,
        });
      }
    }
  };
  return (
    <ItemContainer
      onClick={() => {
        router.push(`/shopDetail/?shopId=${id}`);
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
            <div className="flex h-[28px] w-[28px] items-center justify-center rounded bg-[rgba(79,79,79,0.1)]">
              <Image
                src="/svg/wish/filled-bookmark.svg"
                width={24}
                height={24}
                alt="wish"
                onClick={(e) => {
                  handleFavorite(e, id);
                }}
              />
            </div>
          ) : (
            <div className="flex h-[28px] w-[28px] items-center justify-center rounded bg-[rgba(79,79,79,0.1)]">
              <Image
                src="/svg/wish/lined-bookmark.svg"
                width={24}
                height={24}
                alt="wish"
                className="cursor-pointer"
                onClick={(e) => handleFavorite(e, id)}
              />
            </div>
          )}
        </FavoriteBtn>
      </ItemImgContainer>
      <span className="truncate text-label1">{place_name}</span>
      <ItemDescBox>
        <span className="flex pr-2">
          <Image src="/svg/star.svg" width={16} height={16} alt="star" />
          {star_rating} ({review_cnt})
        </span>
        <div className="pl-2 border-l">
          <span className="pr-1">찜</span>
          <span className="font-semibold">{shopInfo?.favorite_cnt}</span>
          <span className="ml-9 text-caption1 text-text-alternative">
            {shopInfo?.distance}
          </span>
        </div>
      </ItemDescBox>
      <div className="relative flex pt-2">
        {shopInfo?.shop_titles &&
          shopInfo?.shop_titles?.map((title, idx) => (
            <ShopTitle key={idx} title={title} width={65} height={20} />
          ))}
      </div>
    </ItemContainer>
  );
};

const ItemContainer = tw.li`
flex flex-col cursor-pointer relative pb-3 self-start
`;
const FavoriteBtn = tw.div`
absolute top-1 right-1 mt-1 mr-0.5
`;
const ItemImgContainer = tw.div`
mb-3 min-h-[160px] w-full rounded-lg relative
`;
const ItemDescBox = tw.div`
mt-2 flex text-caption1
`;

export default ShopItem;
