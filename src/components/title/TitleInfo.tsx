import Image from 'next/image';

const TitleInfo = () => {
  return (
    <div className="absolute right-3 -top-3 mt-[80px] flex flex-col items-center">
      <Image
        src="/svg/union.svg"
        width={323}
        height={100}
        alt="칭호 정보"
        className="relative"
      />
      <div className="relative -top-16 z-[999] flex flex-col items-center text-label2 font-semibold">
        <span>매일 02시에 회원 칭호가 부여됩니다.</span>
        <span>획득한 칭호 중 하나를 대표 칭호로 설정할 수 있어요.</span>
      </div>
    </div>
  );
};

export default TitleInfo;
