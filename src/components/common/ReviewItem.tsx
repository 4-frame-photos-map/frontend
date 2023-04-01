import Image from 'next/image';
import tw from 'tailwind-styled-components';
import StarRate from '@components/common/StarRate';
import dateFormat from '@utils/dateFormat';

type ReviewItemProps = {
  create_date: string;
  star_rating: number;
  content: string;
  purity: string;
  retouch: string;
  item: string;
  member_info: {
    id: number;
    nickname: string;
  };
};

const ReviewItem = ({
  create_date,
  star_rating,
  content,
  purity,
  retouch,
  item,
  member_info,
}: ReviewItemProps) => {
  return (
    <div className="pb-3 text-text-normal">
      <ReviewBox>
        <ReviewInfo>
          <div className="flex items-center">
            <StarRate rate={star_rating} />
            <div className="pl-[6px]">{member_info.nickname}</div>
          </div>
          <div>{dateFormat(create_date)}</div>
        </ReviewInfo>
        <ReviewValueBox>
          {purity !== 'UNSELECTED' ? (
            <ReviewValue>
              <Image
                src={'/svg/checkbox_disable.svg'}
                width={18}
                height={18}
                alt="체크"
              />
              <span className="ml-1">{purity}</span>
            </ReviewValue>
          ) : (
            <></>
          )}
          {retouch !== 'UNSELECTED' ? (
            <ReviewValue>
              <Image
                src={'/svg/checkbox_disable.svg'}
                width={18}
                height={18}
                alt="체크"
              />
              <span className="ml-1">{retouch}</span>
            </ReviewValue>
          ) : (
            <></>
          )}
          {item !== 'UNSELECTED' ? (
            <ReviewValue>
              <Image
                src={'/svg/checkbox_disable.svg'}
                width={18}
                height={18}
                alt="체크"
              />
              <span className="ml-1">{item}</span>
            </ReviewValue>
          ) : (
            <></>
          )}
        </ReviewValueBox>
        <ReviewContent>{content}</ReviewContent>
      </ReviewBox>
    </div>
  );
};

const ReviewBox = tw.div`
rounded-[20px] p-4 shadow-[0_8px_20px_0px_rgba(0,0,0,0.1)]
`;
const ReviewInfo = tw.div`
flex justify-between text-caption2
`;
const ReviewValueBox = tw.div`
mt-4 flex flex-wrap text-caption1
`;
const ReviewValue = tw.div`
mr-2 mb-2 flex rounded-[100px] bg-[#F4F4F5] px-3 py-1 text-text-normal
`;
const ReviewContent = tw.div`
mt-2 text-body2
`;
export default ReviewItem;
