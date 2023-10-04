import Image from 'next/image';
import tw from 'tailwind-styled-components';
import StarRate from '@components/common/StarRate';
import dateFormat from '@utils/dateFormat';
import TitleBadge from '@components/title/TitleBadge';

type ReviewItemProps = {
  create_date: number[];
  star_rating: number;
  content: string;
  purity?: string;
  retouch?: string;
  item?: string;
  member_info?: member_info;
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
            {member_info && (
              <div className="pl-[6px]">{member_info.nickname}</div>
            )}
            <div className="ml-2">
              {member_info?.main_member_title && (
                <TitleBadge
                  className="h-fit w-fit px-2 text-[9px]"
                  name={member_info.main_member_title as string}
                />
              )}
            </div>
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
                alt={purity === 'GOOD' ? '청결상태 좋음' : '청결상태 나쁨'}
              />
              <span className="ml-1">
                {purity === 'GOOD' ? '청결상태 좋음' : '청결상태 나쁨'}
              </span>
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
                alt={retouch === 'GOOD' ? '보정정도 높음' : '보정정도 낮음'}
              />
              <span className="ml-1">
                {retouch === 'GOOD' ? '보정정도 높음' : '보정정도 낮음'}
              </span>
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
                alt={item === 'GOOD' ? '악세사리 많음' : '악세사리 적음'}
              />
              <span className="ml-1">
                {item === 'GOOD' ? '악세사리 많음' : '악세사리 적음'}
              </span>
            </ReviewValue>
          ) : (
            <></>
          )}
        </ReviewValueBox>
        <ReviewContent>{content}</ReviewContent>
        <div></div>
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
