import Image from 'next/image';

type StarRateProps = {
  color?: boolean;
  rate: number;
};

const StarRate = ({ color = false, rate }: StarRateProps) => {
  return (
    <div className="flex">
      {Array(Math.floor(rate))
        .fill(2)
        .map((_, idx) => (
          <Image
            key={idx}
            src={
              color ? `/svg/checked_star.svg` : `/svg/checked_star_black.svg`
            }
            width={color ? 25 : 18}
            height={color ? 25 : 18}
            alt={color ? `별` : `검정색 별`}
          />
        ))}
      {rate % 1 !== 0 && (
        <Image
          src={color ? `/svg/half_star.svg` : `/svg/half_star_black.svg`}
          width={color ? 25 : 18}
          height={color ? 25 : 18}
          alt={color ? `반 별` : `검정색 반 별`}
        />
      )}
      {Array(Math.floor(5 - rate))
        .fill(2)
        .map((_, idx) => (
          <Image
            key={idx}
            src={color ? `/svg/blank_star.svg` : `/svg/blank_star_black.svg`}
            width={color ? 25 : 18}
            height={color ? 25 : 18}
            alt={color ? `빈 별` : `검정색 빈 별`}
          />
        ))}
    </div>
  );
};

export default StarRate;
