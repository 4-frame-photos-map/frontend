import Image from 'next/image';

const TrackerButton = () => {
  return (
    <div className="absolute bottom-14 right-0 mr-[25px] mb-[14px] flex justify-end">
      <button className="h-[44px] w-[44px] rounded-full bg-[#333333] shadow-tracker">
        <Image
          src="/svg/home/track.svg"
          alt="tracker"
          width={24}
          height={24}
          className="m-[10px]"
        />
      </button>
    </div>
  );
};

export default TrackerButton;
