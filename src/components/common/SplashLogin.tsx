import Image from 'next/image';

const SplashLogin = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mt-[100px] flex flex-col items-center">
        <Image
          src="/svg/login/pin-badge-skyblue.svg"
          width={114}
          height={114}
          priority={true}
          alt="pin-badge"
        />
        <Image
          src="/svg/login/4-cut-photos-map.svg"
          width={218}
          height={44}
          alt="4-cut-photos-map"
        />
      </div>
      <Image
        src="/svg/login/splash-image.svg"
        width={375}
        height={300}
        priority={true}
        alt=""
      />
    </div>
  );
};

export default SplashLogin;
