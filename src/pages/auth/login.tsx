import PageLayout from '@/components/common/PageLayout';
import Image from 'next/image';

const Login = () => {
  return (
    <PageLayout>
      <Image
        src="/svg/login-logo.svg"
        alt="logo"
        width={183}
        height={48}
        className="absolute left-[96px] top-[337px] h-[48px] w-[183px]"
      />
      <div className="absolute left-[38px] top-[504px] flex h-[45px] w-[300px] flex-row items-center justify-center gap-[8px] rounded-[6px] bg-[#FEE500] p-[20px]">
        <Image src="/svg/kakao.svg" alt="Kakao Icon" width={18} height={18} />
        <span className="h-[17px] w-[80px] cursor-pointer text-[14.5px] font-normal not-italic leading-[17px] text-[#000000]">
          카카오 로그인
        </span>
      </div>
      <p className="absolute left-[129px] top-[573px] h-[17px] w-[121px] cursor-pointer text-[14.5px] font-normal not-italic leading-[17px] text-[#000000] underline">
        로그인 없이 이용하기
      </p>
    </PageLayout>
  );
};

export default Login;
